import { mount } from "@vue/test-utils";
import FolderContent from "../FolderContent.vue";
import { describe, expect, test } from "vitest";

describe("FolderContent", () => {
  test("Show empty folder when first mount", async () => {
    // Mount the component
    const wrapper = mount(FolderContent, {
      props: {
        activeFolder: {
          children: [],
        },
      },
    });

    expect(wrapper.text()).toContain("Folder ini kosong");
  });

  test("Show list of files when folder has children", async () => {
    // Mount the component
    const wrapper = mount(FolderContent, {
      props: {
        activeFolder: {
          children: [
            { id: 1, name: "File 1", type: "file" },
            { id: 2, name: "File 2", type: "file" },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain("File 1");
    expect(wrapper.text()).toContain("File 2");
  });

  test("Show list of folders when folder has children", async () => {
    // Mount the component
    const wrapper = mount(FolderContent, {
      props: {
        activeFolder: {
          children: [
            { id: 1, name: "Folder 1", type: "folder" },
            { id: 2, name: "Folder 2", type: "folder" },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain("Folder 1");
    expect(wrapper.text()).toContain("Folder 2");
  });

  test("Show list of files and folders when folder has children", async () => {
    // Mount the component
    const wrapper = mount(FolderContent, {
      props: {
        activeFolder: {
          children: [
            { id: 1, name: "File 1", type: "file" },
            { id: 2, name: "Folder 2", type: "folder" },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain("File 1");
    expect(wrapper.text()).toContain("Folder 2");
  });
});
