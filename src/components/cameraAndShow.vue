<template>
  <div>
    <div class="container bg-white">
      <div class="row mb-3">
        <div class="col-lg-12">
          <div class="d-flex justify-content-center">
            <button
              name="button"
              class="btn-lg text-light my-5"
              style="background-color: #112e51"
              @click.prevent="getLabelFromDB"
            >
              Start Checking Attendance Program
            </button>
          </div>
        </div>
      </div>
      <div v-show="isloaded" class="row my-3">
        <div class="col-lg-6">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <button class="btn-sm text-light"  style="background-color: #112e51" @click="front">
                  Use Front Camera
                </button>
                <button class="btn-sm text-light"  style="background-color: #112e51" @click="rear">
                  Use Rear Camera
                </button>
              </div>

              <div class="col-sm-6"></div>
            </div>
            <div class="row">
              <div class="border rounded-bottom">
                <div class="container justify-content-center p-3">
                  <div class="embed-responsive-4by3">
                    <video
                      class="embed-responsive-item"
                      v-show="isloaded"
                      id="video"
                      ref="livevideo"
                      width="100%"
                      height="auto"
                      autoplay
                    ></video>
                  </div>
                  <div class="d-flex justify-content-center m-5 login_container">
              <button
                type="submit"
                name="button"
                class="btn-lg login_btn text-light"
                style="background-color: #58bcdd"
                @click.prevent="setRegcognizedData"
              >
                Sent Results
              </button>
            </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="row">
            <div class="col-sm-6">
              <div class="card mb-3">
                <div class="card-header bg-success">CHECKED</div>
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="student in studentsListCHECKED"
                    :key="student.studentDataId"
                  >
                    {{ student.studentDataId }} -
                    {{ student.studentDataFname }}
                    {{ student.studentDataLname }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card mb-3">
                <div class="card-header bg-danger">Not found Yet</div>
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="student in studentsListUNCHECKED"
                    :key="student.studentDataId"
                  >
                    {{ student.studentDataId }} -
                    {{ student.studentDataFname }}
                    {{ student.studentDataLname }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import db from "../views/firebaseInit";
import firebase from "firebase";
export default {
  name: "cameraAndShow",
  components: {},
  props: ["dataForSort"],
  data() {
    return {
      Size: 960,
      Score: 0.65,

      isloaded: false,
      sortsubmit: true,
      matchedpair: [],

      //------------ on code
      studentsListUNCHECKED: [],
      studentsListCHECKED: [],
      LabeledFaces: [],
    };
  },
  created() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ]).then();
  },
  methods: {
    getLabelFromDB() {
      db.collection("students")
        .where("matthayom", "==", Number(this.dataForSort.matthayom))
        .where("slash", "==", Number(this.dataForSort.slash))
        .get()
        .then((querySnapshots) => {
          querySnapshots.forEach((doc) => {
            const parsedDescriptors = [];
            /*if (
              doc.data().matthayom == this.dataForSort.matthayom &&
              doc.data().slash == this.dataForSort.slash
            ) {*/
            var studentData = {
              studentDataId: doc.data().studentid,
              studentDataFname: doc.data().Fname,
              studentDataLname: doc.data().Lname,
            };

            this.studentsListUNCHECKED.push(studentData);
            doc.data().descriptors.forEach((descriptor) => {
              parsedDescriptors.push(new Float32Array(JSON.parse(descriptor)));
            });
            this.LabeledFaces.push(
              new faceapi.LabeledFaceDescriptors(
                doc.data().studentid,
                parsedDescriptors
              )
            );
            /*} else {
              console.log("GetDescriptorsFailed");
            }*/
          });
          console.log("labeledFACES", this.LabeledFaces);
          console.log("studentsListUNCHECKED", this.studentsListUNCHECKED);
        })
        .then((this.isloaded = true));
    },
    front() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.sortsubmit = true;
          this.$refs.livevideo.srcObject = stream;
        })
        .then(this.FaceDetect)
        .catch((error) => {
          this.sortsubmit = false;
          console.log(error);
        });
    },
    rear() {
      const constraints = (window.constraints = {
        audio: false,
        video: { facingMode: { exact: "environment" } },
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.sortsubmit = true;
          this.$refs.livevideo.srcObject = stream;
        })
        .then(this.FaceDetect)
        .catch((error) => {
          this.sortsubmit = false;
          console.log(error);
        });
    },
    async FaceDetect() {
      const faceMatcher = new faceapi.FaceMatcher(this.LabeledFaces);

      setInterval(async () => {
        var options = new faceapi.TinyFaceDetectorOptions({
          inputSize: Number(this.Size),
          scoreThreshold: Number(this.Score),
        });
        const detections = await faceapi
          .detectAllFaces(document.getElementById("video"), options)
          .withFaceLandmarks()
          .withFaceDescriptors();
        //console.log('CAMdetections :', detections);
        detections.forEach(async (detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          console.log(bestMatch.toString());
          console.log(bestMatch.distance);
          this.matchedpair.push(bestMatch.toString());
          //--------------------------CHeCK & UNcheck List manager
          this.studentsListUNCHECKED.forEach((uncheckStudent) => {
            if (uncheckStudent.studentDataId == bestMatch.toString(false) && bestMatch.distance <= 0.40) {
              this.studentsListCHECKED.push(uncheckStudent);
              this.studentsListUNCHECKED = this.studentsListUNCHECKED.filter(
                (value) => {
                  return value != uncheckStudent;
                }
              );
            }
          });
        });
        console.log("end 1 loop");
      }, 300);
    },
    setRegcognizedData() {
      this.studentsListCHECKED.forEach((checkedstudentid) => {
        this.dataForSort.periods.forEach((period) => {
          db.collection("matthayom")
            .doc(`${this.dataForSort.matthayom}-${this.dataForSort.slash}`)
            .collection(`${checkedstudentid.studentDataId}`)
            .doc(`${this.dataForSort.date}`)
            .collection("periods")
            .doc(`p${period}`)
            .set(
              {
                period: period,
                status: 1, //-----------------*CUMMMMMM*
                subject: this.dataForSort.subject,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true }
            );
        });
      });

      this.studentsListUNCHECKED.forEach((absentstudentid) => {
        this.dataForSort.periods.forEach((period) => {
          db.collection("matthayom")
            .doc(`${this.dataForSort.matthayom}-${this.dataForSort.slash}`)
            .collection(`${absentstudentid.studentDataId}`)
            .doc(`${this.dataForSort.date}`)
            .collection("periods")
            .doc(`p${period}`)
            .set(
              {
                period: period,
                status: 0, //-----------ABSENT
                subject: this.dataForSort.subject,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true }
            );
        });
      });
    },
  },
};
</script>


