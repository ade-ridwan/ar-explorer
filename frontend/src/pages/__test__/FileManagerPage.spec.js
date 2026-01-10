import { mount } from "@vue/test-utils";
import FileManagerPage from "../FileManagerPage.vue";
import { expect, test, describe } from "vitest";

describe("FileManagerPage", () => {
  test('increments count when button is clicked', async () => {
    // Mount the component
    const wrapper = mount(FileManagerPage);

    // Find the folder tree title
    const folderTreeTitle = wrapper.find('#folder-tree-title');

    // Assert the text content
    expect(folderTreeTitle.text()).toBe('Navigasi Folder');
  });
});
