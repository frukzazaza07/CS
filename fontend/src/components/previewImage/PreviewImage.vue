<template>
  <div class="flex w-full h-screen items-center justify-center text-center">
    <div
      class="p-12 bg-gray-100 border border-gray-300"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      :class="imageSrc ? 'p-2 pt-4 pb-4' : 'p-5'"
    >
      <div class="preview-image-container" v-if="imageSrc">
        <img class="image-preview" :src="imageSrc" alt="" />
      </div>

      <label
        for="assetsFieldHandle"
        class="block cursor-pointer"
        :class="filelist.length > 0 ? 'd-none' : ''"
      >
        <div class="position-relative">
          <input
            type="file"
            class="w-px h-px opacity-0 overflow-hidden absolute custom-control-input"
            @change="onChange"
            ref="file"
            accept=".pdf,.jpg,.jpeg,.png"
            style="width: 100%; z-index: 10;"
          />
          <sapn>drop file or click here</sapn>
        </div>
      </label>
      <div>
        <div class="text-sm p-1" v-for="(file, index) in filelist" :key="index">
          {{ file.name }}
        </div>
        <div class="mt-1" :class="filelist.length === 0 ? 'd-none' : ''">
          <button
            class="btn btn-sm btn-danger"
            type="button"
            @click="remove()"
            title="Remove file"
          >
            remove
          </button>
        </div>
      </div>
      <!-- <ul class="mt-4" v-if="this.filelist.length" v-cloak>
        <li class="text-sm p-1" v-for="file in filelist" :key="file">
          ${ file.name }<button
            class="ml-2"
            type="button"
            @click="remove(filelist.indexOf(file))"
            title="Remove file"
          >
            remove
          </button>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "PreviewImage",
  props: {
    handleFileChange: Function,
    handleFileKey: String,
  },
  data() {
    return {
      filelist: [], // Store our uploaded files
      imageSrc: null,
    };
  },
  methods: {
    onChange() {
      if (!this.$refs.file.files) return;
      this.filelist = this.$refs.file.files;
      this.handleFileChange(this.filelist, this.handleFileKey);
      const file = this.$refs.file.files[0];
      this.imageSrc = URL.createObjectURL(file);
    },
    remove() {
      this.filelist = [];
      this.imageSrc = null;
      this.handleFileChange("", this.handleFileKey);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
  },
};
</script>

<style>
@import "../../styles/previewImage/main.css";
</style>
