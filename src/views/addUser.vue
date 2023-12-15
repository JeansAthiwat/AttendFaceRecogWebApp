<template>
  <div>
    <div class="container p-3" style="background-color: #ffffff">
      <h3>Add Student To Database</h3>
      <p>
        to use face recognition we need students basics info and some of their
        photos
      </p>
    </div>

    <div class="form-body">
      <div class="container mt-1 bg-white rounded">
        <div class="row d-flex justify-content-start align-items-center p-3">
          <div class="row">
            <div class="col-md-5">
              <div class="container-fluid item-align-center">
                <add-user-image @allimguploaded="shitisfire"></add-user-image>
              </div>
            </div>
            <div class="col-md-7">
              <div class="form-holder">
                <div class="form-content">
                  <div class="form-items">
                    <form ref="userForm" @submit.prevent="addData" required>
                      <div class="custom-control custom-checkbox">
                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Student ID</span>
                          </div>
                          <input
                            required
                            type="number"
                            name="studentID"
                            class="form-control input_user"
                            placeholder="(Ex. 59696)"
                            v-model="newUser.studentid"
                          />
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">First Name</span>
                          </div>
                          <input
                            required
                            type="text"
                            name="Fname"
                            class="form-control input_user"
                            placeholder="(Ex. Prayat)"
                            v-model="newUser.Fname"
                          />
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Last Name</span>
                          </div>
                          <input
                            required
                            type="text"
                            name="Lname"
                            class="form-control input_user"
                            placeholder="(Ex. Chan-a-Cha)"
                            v-model="newUser.Lname"
                          />
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Gender</span>
                          </div>
                          <select
                            required
                            class="form-control"
                            name="gender"
                            v-model="newUser.gender"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Matthayom</span>
                          </div>
                          <select
                            required
                            class="form-control"
                            name="Matthayom"
                            v-model="newUser.matthayom"
                          >
                            <option value="1">ม.1</option>
                            <option value="2">ม.2</option>
                            <option value="3">ม.3</option>
                            <option value="4">ม.4</option>
                            <option value="5">ม.5</option>
                            <option value="6">ม.6</option>
                          </select>
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Slash</span>
                          </div>
                          <select
                            required
                            class="form-control"
                            name="Slash"
                            v-model="newUser.slash"
                          >
                            <option value="1">/1</option>
                            <option value="2">/2</option>
                            <option value="3">/3</option>
                            <option value="4">/4</option>
                            <option value="5">/5</option>
                            <option value="6">/6</option>
                            <option value="7">/7</option>
                            <option value="8">/8</option>
                            <option value="9">/9</option>
                            <option value="10">/10</option>
                            <option value="11">/11</option>
                            <option value="12">/12</option>
                            <option value="13">/13</option>
                            <option value="14">/14</option>
                            <option value="15">/15</option>
                            <option value="16">/16</option>
                            <option value="17">/17</option>
                            <option value="18">/18</option>
                            <option value="19">/19</option>
                            <option value="20">/20</option>
                          </select>
                        </div>

                        <div class="input-group mb-2">
                          <div class="input-group-append">
                            <span class="input-group-text">Number</span>
                          </div>
                          <input
                            required
                            type="Number"
                            name="no"
                            class="form-control input_user"
                            placeholder="(Ex. 33)"
                            v-model="newUser.no"
                          />
                        </div>
                      </div>

                      <div class="container-fluid">
                        <div class="d-flex justify-content-center">
                          <button
                            class="btn-lg bg-light"
                            id="SubmitBtn"
                            type="submit"
                            disabled
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import addUserImage from "../components/addUserImage.vue";
import db from "./firebaseInit";
export default {
  name: "addUser",
  data() {
    return {
      userDescriptors: null,
      newUser: {
        studentid: null,
        gender: "male",
        Fname: null,
        Lname: null,
        no: null,
        matthayom: 6,
        slash: 20,
      },
    };
  },
  methods: {
    async shitisfire(datafromaddimg) {
      console.log("do");
      this.userDescriptors = await datafromaddimg;
      const submitBtn = document.getElementById("SubmitBtn");
      submitBtn.removeAttribute("disabled");
      submitBtn.className = "btn-lg bg-success text-light"
    },
    async addData() {
      console.log("oKEY");
      const dataToFirebase = {
        studentid: this.newUser.studentid,
        gender: this.newUser.gender,
        Fname: this.newUser.Fname,
        Lname: this.newUser.Lname,
        no: this.newUser.no,
        matthayom: Number(this.newUser.matthayom),
        slash: Number(this.newUser.slash),
        descriptors: this.userDescriptors,
      };
      console.log("YEET");
      await db
        .collection("students")
        .add(dataToFirebase)
        .then(() => console.log("data added!"))
        .then(() => {
          const submitBtn = document.getElementById("SubmitBtn");
          (this.newUser.studentid = null),
            (this.newUser.Fname = null),
            (this.newUser.Lname = null),
            (this.newUser.no = null),
            (this.userDescriptors = null);
            submitBtn.setAttribute('disabled',"")
            submitBtn.className = "btn-lg bg-light"
        });
    },
  },
  components: {
    addUserImage,
  },
};


/*<div class="container mt-5 bg-white rounded">
      <div class="row d-flex justify-content-center align-items-center p-3">
        <div class="col-md-8">
          <form ref="userForm" @submit.prevent="addData">
            <span>Student ID เลขประจำตัวนักเรียน :</span>
            <input type="number" name="studentID" v-model="newUser.studentid" />
            <br />

            <span>First Name : </span
            ><input type="text" name="Fname" v-model="newUser.Fname" />
            <br />
            <span>Last Name : </span>
            <input type="text" name="Lname" v-model="newUser.Lname" />
            <br />
            <span>Gender : </span>
            <select name="gender" v-model="newUser.gender">
              <option value="male">Male ชาย</option>
              <option value="female">Female หญิง</option>
            </select>
            <br />
            <span>matthayom ม. :</span>
            <select v-model="newUser.matthayom">
              <option value="1">ม.1</option>
              <option value="2">ม.2</option>
              <option value="3">ม.3</option>
              <option value="4">ม.4</option>
              <option value="5">ม.5</option>
              <option value="6">ม.6</option>
            </select>
            <br />

            <select v-model="newUser.slash">
              <option value="1">/1</option>
              <option value="2">/2</option>
              <option value="3">/3</option>
              <option value="4">/4</option>
              <option value="5">/5</option>
              <option value="6">/6</option>
              <option value="7">/7</option>
              <option value="8">/8</option>
              <option value="9">/9</option>
              <option value="10">/10</option>
              <option value="11">/11</option>
              <option value="12">/12</option>
              <option value="13">/13</option>
              <option value="14">/14</option>
              <option value="15">/15</option>
              <option value="16">/16</option>
              <option value="17">/17</option>
              <option value="18">/18</option>
              <option value="19">/19</option>
              <option value="20">/20 สุดหล่อเท่ห์</option>
            </select>
            <br />
            <span>Number เลขที่ :</span>
            <input type="number" v-model="newUser.no" />

            <button type="submit">Submit</button>
          </form>

          <add-user-image @allimguploaded="shitisfire"></add-user-image>

          <p>{{ userDescriptors }}</p>
        </div>
      </div>
    </div>*/
</script>


