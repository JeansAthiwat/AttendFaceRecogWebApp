<template>
  <div>
    <div class="container p-3" style="background-color: #ffffff">
      <h3>Attendance Checking Via Face Recognition</h3>
      <p>
        to use face recognition we need students basics info and some of their
        photos
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
                    <form ref="userForm" @submit.prevent="prepForLink" required>
                      <div class="custom-control custom-checkbox">
                        <div class="row">
                          <div class="col-lg-4">
                            <div class="input-group mb-2">
                              <div class="input-group-append">
                                <span class="input-group-text">Matthayom</span>
                              </div>
                              <select
                                required
                                class="form-control"
                                name="Matthayom"
                                v-model="preCheckForm.matthayom"
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

                          <div class="col-lg-4">
                            <div class="input-group mb-2">
                              <div class="input-group-append">
                                <span class="input-group-text">Slash</span>
                              </div>
                              <select
                                required
                                class="form-control"
                                name="Slash"
                                v-model="preCheckForm.slash"
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
                                v-model="preCheckForm.date"
                              />
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="input-group mb-2">
                              <div class="input-group-append">
                                <span class="input-group-text">Subject</span>
                              </div>
                              <input
                                required
                                type="text"
                                name="subject"
                                class="form-control"
                                placeholder="(Ex. ง52141)"
                                v-model="preCheckForm.subject"
                              />
                            </div>
                          </div>
                          <div class="col-lg-8">
                            <div class="input-group mb-2">
                              <div class="form-check form-check-inline">
                                <div class="form-check form-check-inline">
                                  <div class="input-group-append">
                                    <span class="input-group-text"
                                      >Period(s)</span
                                    >
                                  </div>
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period0"
                                    >0</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period0"
                                    value="0"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period1"
                                    >1</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period1"
                                    value="1"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period2"
                                    >2</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period2"
                                    value="2"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period3"
                                    >3</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period3"
                                    value="3"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period4"
                                    >4</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period4"
                                    value="4"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period5"
                                    >5</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period5"
                                    value="5"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period6"
                                    >6</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period6"
                                    value="6"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period7"
                                    >7</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period7"
                                    value="7"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period8"
                                    >8</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period8"
                                    value="8"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period9"
                                    >9</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period9"
                                    value="9"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>

                                <div class="form-check form-check-inline">
                                  <label class="form-check-label" for="period10"
                                    >10</label
                                  >
                                  <input
                                    type="checkbox"
                                    id="period10"
                                    value="10"
                                    class="form-check-input"
                                    v-model="preCheckForm.periods"
                                  />
                                </div>
                              </div>
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

    <div class="container-fluid">
      <camAndShow v-bind:dataForSort="preCheckForm" />
    </div>
  </div>
</template>

<script lang>
import camAndShow from "../components/cameraAndShow";

export default {
  name: "faceReg",
  components: {
    camAndShow,
  },
  data() {
    return {
      preCheckForm: {
        academicYear: 2021,
        matthayom: 6,
        slash: 1,
        date: null,
        periods: [], //คาบ
        subject: null,
      },
    };
  },
  methods: {},
};
</script>
