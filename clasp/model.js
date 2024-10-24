function loadModel() {
  const fileId = 'TU_ID_DEL_ARCHIVO'; // Reemplaza con el ID del archivo de Google Drive
  const blob = DriveApp.getFileById(fileId).getBlob();

  // Puedes procesar el blob o pasarlo a un endpoint de una API para inferencias
  const modelData = blob.getDataAsString();
  
  return modelData
}
