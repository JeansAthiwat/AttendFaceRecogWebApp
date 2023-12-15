<template>
  <div>
    <div class="container-fluid rounded">
      <div
        class="container-fluid text-dark px-2 my-1"
        style="background-color: #ededee"
      >
        <h4>Please Insert 3 photos</h4>
        <p>
          (All facial features <strong>must be visibe</strong> to the Camera)
        </p>
      </div>
      <div>
        <input
          class="form-control"
          v-show="isloaded"
          type="file"
          id="imagefiles"
          ref="myfiles"
          @change="previewPics"
          multiple
          accept="image/*,.jpg,.jpeg,.png"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center py-1 px-5">
      <div class="user_card px-5 py-4 mx-5" style="background-color: #ffffff">
        <div class="d-flex justify-content-center pb-3">
          <div id="output"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img"),
});
export default {
  name: "addUserImage",
  data() {
    return {
      isloaded: false,
      files: [],
      descriptorsjson: [],
    };
  },
  methods: {
    previewPics() {
      this.getDescriptor();
      /*var output = document.getElementById("output");
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };*/
    },
    async getDescriptor() {
      // const imageupload = document.getElementById('imagefiles')
      for (
        let index = 0;
        index < document.getElementById("imagefiles").files.length;
        index++
      ) {
        const toimage = await faceapi.bufferToImage(
          document.getElementById("imagefiles").files[index]
        );

        const detection = await faceapi
          .detectSingleFace(toimage)
          .withFaceLandmarks()
          .withFaceDescriptor();
        this.descriptorsjson.push(
          JSON.stringify(Array.from(detection.descriptor))
        );
        toimage.className = "img-fluid img-thumbnail float-left rounded";
        const output = document.getElementById("output");
        output.appendChild(toimage);
      }
      this.$emit("allimguploaded", this.descriptorsjson);
      this.descriptorsjson = [];
    },
  },
  created() {
    Promise.all([
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]).then(() => {
      this.isloaded = true;
    });
  },
};
</script>