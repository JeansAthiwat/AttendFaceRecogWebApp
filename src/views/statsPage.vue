<template>
  <div>
    <div class="container p-3" style="background-color: #ffffff">
      <h3>Student Attendance Status</h3>
      <p>
        Fill in the form to get the data from the database
      </p>
    </div>

    <div class="form-body">
      <div class="container mt-1 bg-white rounded">
        <div class="row d-flex justify-content-start align-items-center p-3">
          <div class="row">
            <div class="col-md-12">
              <div class="form-holder">
                <div class="form-content">
                  <div class="form-items">
                    <form ref="getStatsForm" required>
                      <div class="custom-control custom-checkbox">
                        <div class="row">
                          <div class="col-lg-3">
                            <div class="input-group mb-1">
                              <div class="input-group-append">
                                <span class="input-group-text">Matthayom</span>
                              </div>
                              <select
                                required
                                class="form-control"
                                name="Matthayom"
                                v-model="dataToGet.matthayom"
                              >
                                <option value="1">ม.1</option>
                                <option value="2">ม.2</option>
                                <option value="3">ม.3</option>
                                <option value="4">ม.4</option>
                                <option value="5">ม.5</option>
                                <option value="6">ม.6</option>
                              </select>
                            </div>
                          </div>

                          <div class="col-lg-3">
                            <div class="input-group mb-1">
                              <div class="input-group-append">
                                <span class="input-group-text">Slash</span>
                              </div>
                              <select
                                required
                                class="form-control"
                                name="Slash"
                                v-model="dataToGet.slash"
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
                          </div>

                          <div class="col-lg-4">
                            <div class="input-group mb-1">
                              <div class="input-group-append">
                                <span class="input-group-text">Date</span>
                              </div>
                              <input
                                required
                                type="date"
                                name="date"
                                class="form-control"
                                v-model="dataToGet.date"
                              />
                            </div>
                          </div>

                          <div class="col-lg-2 float-right">
                            <div class="d-flex justify-content-center">
                              <button
                                class="btn bg-info text-light"
                                id="SubmitBtn"
                                type="submit"
                                @click.prevent="getQuery"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
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

    <div>
      <div class="container-fluid">
        <div class="table-responsive-md">
          <table
            id="table"
            class="table table-bordered table-light"
          >
            <thead>
              <tr>
                <th scope="col" rowspan="2">ID</th>
                <th scope="col" rowspan="2">Name</th>
                <th scope="col" colspan="11">Attendance Status</th>
              </tr>
              <tr>
                <th scope="col">p0</th>
                <th scope="col">p1</th>
                <th scope="col">p2</th>
                <th scope="col">p3</th>
                <th scope="col">p4</th>
                <th scope="col">p5</th>
                <th scope="col">p6</th>
                <th scope="col">p7</th>
                <th scope="col">p8</th>
                <th scope="col">p9</th>
                <th scope="col">p10</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "statsPage",
  components: {},
  data() {
    return {
      studentsList: [],
      dataToGet: {
        matthayom: null,
        slash: null,
        date: null,
      },
    };
  },
  methods: {
    getQuery() {
      db.collection("students")
        .orderBy("studentid", "asc")
        .where("matthayom", "==", Number(this.dataToGet.matthayom))
        .where("slash", "==", Number(this.dataToGet.slash))
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            const studentData = {
              studentid: doc.data().studentid,
              name: `${doc.data().Fname} ${doc.data().Lname}`,
            };
            this.studentsList.push(studentData);
          });
          console.log(this.studentsList);
          this.studentsList.forEach((student) => {
            console.log("entered");
            var tablerow = document.createElement("tr"); //<tr></tr>
            var idCol = document.createElement("th"); //<td></td>
            idCol.setAttribute("scope", "row");
            idCol.className = "bg-white"
            var nameCol = document.createElement("td");
            nameCol.className = "bg-white"
            idCol.innerHTML = `${student.studentid}`; ///<td>51359</td>
            nameCol.innerHTML = `${student.name}`;
            tablerow.appendChild(idCol);
            tablerow.appendChild(nameCol);

            for (let index = 0; index < 11; index++) {
              db.collection("matthayom")
                .doc(`${this.dataToGet.matthayom}-${this.dataToGet.slash}`)
                .collection(`${student.studentid}`)
                .doc(`${this.dataToGet.date}`)
                .collection("periods")
                .doc(`p${index}`)
                .get()
                .then((doc) => {
                  var periodCol = document.createElement("td");
                  if (doc.exists) {
                    periodCol.innerHTML = `${doc.data().status}`;
                    if (doc.data().status == 1) {
                      periodCol.className = "bg-success";
                    }
                    if (doc.data().status == 0) {
                      periodCol.className = "bg-danger";
                    }

                    tablerow.appendChild(periodCol);
                  } else {
                    periodCol.innerHTML = "-";
                    periodCol.className = "bg-warning";
                    tablerow.appendChild(periodCol);
                  }
                });
            }
            document.getElementById("table").appendChild(tablerow);
          });
        });
    },
  },
};
</script>

<style>
</style>