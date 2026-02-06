import JSZip from "jszip";
import saveAs from "file-saver";
const downloadProject = () => {
    const zip = new JSZip();
    zip.folder('folder')?.folder('subfolder')?.file('file.txt', 'hello world');
    zip.generateAsync({ type: 'blob' })
        .then(content => {
        saveAs(content, 'archive.zip');
    });
};
export default downloadProject;
//# sourceMappingURL=downloadProject.js.map