import { mount, flushPromises } from "@vue/test-utils";
import FileManagerPage from "../FileManagerPage.vue";
import { expect, test, describe, vi } from "vitest";

// Mock the API client
const mockGet = vi.fn();
vi.mock('../../utils/api', () => ({
  client: {
    v1: {
      resources: {
        get: () => mockGet(),
        files: () => ({
           get: () => mockGet() // Assuming this is also used, though the requirement specificied rootFolder
        })
      }
    }
  }
}));

// Mock child components to isolate the test
const FolderTreeItemStub = {
  template: '<div data-testid="folder-tree-item"></div>',
  props: ['file', 'selectedId']
};

const FolderContentStub = {
  template: '<div data-testid="folder-content"></div>',
  props: ['activeFolder']
};

// Mock Lucide Icon
const FolderIconStub = {
  template: '<div data-testid="folder-icon"></div>'
};


describe("FileManagerPage", () => {
  test('renders the component properly', () => {
    mockGet.mockResolvedValue({ data: { data: [] }, error: null });
    const wrapper = mount(FileManagerPage, {
        global: {
            stubs: {
                FolderTreeItem: FolderTreeItemStub,
                FolderContent: FolderContentStub,
                FolderIcon: FolderIconStub
            }
        }
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('displays the correct title', () => {
    mockGet.mockResolvedValue({ data: { data: [] }, error: null });
    const wrapper = mount(FileManagerPage, {
        global: {
            stubs: {
                FolderTreeItem: FolderTreeItemStub,
                FolderContent: FolderContentStub,
                FolderIcon: FolderIconStub
            }
        }
    });

    const title = wrapper.find('#folder-tree-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Navigasi Folder');
  });

  test('fetches root folders on mount', async () => {
      const mockData = [
          { id: '1', name: 'Folder 1', type: 'folder', children: [] },
          { id: '2', name: 'File 1', type: 'file' }
      ];

      mockGet.mockResolvedValue({ data: { data: mockData }, error: null });

      const wrapper = mount(FileManagerPage, {
        global: {
            stubs: {
                FolderTreeItem: FolderTreeItemStub, // Important: verify this is rendered for folders
                FolderContent: FolderContentStub,
                FolderIcon: FolderIconStub
            }
        }
      });

      // Wait for promises to resolve (onMounted async call)
      await flushPromises();

      expect(mockGet).toHaveBeenCalled();
      
      // Check if FolderTreeItem is rendered for the folder
      // The component filters for folders: rootFolders.value.filter((f) => f.type === 'folder')
      const folderItems = wrapper.findAll('[data-testid="folder-tree-item"]');
      expect(folderItems.length).toBe(1); // Only 1 folder in mockData
  });
});
