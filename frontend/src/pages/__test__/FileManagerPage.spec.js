import { mount } from "@vue/test-utils";
import FileManagerPage from "../FileManagerPage.vue";
import { expect, test, describe } from "vitest";

describe("FileManagerPage", () => {
  test('renders the component properly', () => {
    const wrapper = mount(FileManagerPage);
    expect(wrapper.exists()).toBe(true);
  });

  test('displays the correctly title', () => {
    const wrapper = mount(FileManagerPage);
    const title = wrapper.find('#folder-tree-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Navigasi Folder');
  });

  test('renders file list area', () => {
    const wrapper = mount(FileManagerPage);
    const fileList = wrapper.find('.file-list');
    expect(fileList.exists()).toBe(true);
  });
  
  test('renders at least one file item (stub check)', () => {
      const wrapper = mount(FileManagerPage);
      const fileItems = wrapper.findAll('[data-testid="file-item"]');
      expect(fileItems.length).toBeGreaterThan(0);
  });
});
