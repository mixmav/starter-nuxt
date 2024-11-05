export const useUploadFiles = () => {
  const { loading, fetch } = useAPI();

  const upload = async (file: File[] | File, body?: Record<string, any>) => {
    const formData = new FormData();
    if (Array.isArray(file)) {
      file.forEach((f) => {
        formData.append('file', f);
      });
    } else {
      formData.append('file', file);
    }

    if (body) {
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const { files } = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    return files;
  };

  return { upload, loading };
};
