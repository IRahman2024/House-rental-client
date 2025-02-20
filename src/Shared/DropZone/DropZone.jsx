import { CircleX } from "lucide-react";
import { useCallback, useMemo, useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#000a09', backgroundColor: '#9ba8a7', color: '#000a09' };
const rejectStyle = { borderColor: '#ff1744' };

const DropZone = forwardRef(({ onFilesChange, required, name }, ref) => {
    const hiddenInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [errorFiles, setErrorFiles] = useState([]);

    // Function to clear all files and reset the component
    const clearFiles = useCallback(() => {
        setFiles([]);
        setErrorFiles([]);
        onFilesChange([]); 

        // Reset the hidden input's files
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = ''; // Clear the input value
            hiddenInputRef.current.files = new DataTransfer().files; // Reset files
        }
    }, [onFilesChange]);

    useImperativeHandle(ref, () => ({
        clearFiles
    }), [clearFiles]); // Add clearFiles to dependency array

    // called on file drop -- point-1
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (hiddenInputRef.current) {
            // Note the specific way we need to munge the file into the hidden input
            // https://stackoverflow.com/a/68182158/1068446
            const dataTransfer = new DataTransfer();
            acceptedFiles.forEach((v) => {
              dataTransfer.items.add(v);
            });
            hiddenInputRef.current.files = dataTransfer.files;
        }

        if (acceptedFiles?.length) {
            const newFiles = acceptedFiles.filter(
                (file) => !files.some((prevFile) => prevFile.name === file.name)
            ).map(file => Object.assign(file, { 
                preview: URL.createObjectURL(file)
            }));

            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            onFilesChange(updatedFiles); // Send files to parent component
        }

        if (fileRejections.length > 0) {
            setErrorFiles(prev => [
                ...prev,
                ...fileRejections.map(({ file, errors }) => ({
                    name: file.name,
                    errors: errors.map((e) => e.message)
                }))
            ]);
        }
    }, [files, onFilesChange]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxSize: 1024 * 1024
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [isFocused, isDragAccept, isDragReject]);

    const removeFile = (name) => {
        const updatedFiles = files.filter((file) => file.name !== name);
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };

    const removeErrorFile = (name) => {
        setErrorFiles(errors => errors.filter((error) => error.name !== name));
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input type="file" name={name} required={required} style={{opacity: 0}} ref={hiddenInputRef}/>
                <input {...getInputProps()} />
                {isDragAccept ? (
                    <p className="text-2xl font-semibold rounded-lg p-5">Drop It</p>
                ) : (
                    <div className="rounded-lg p-5">
                        <p className="text-2xl font-semibold">Try to drop something here...</p>
                    </div>
                )}
            </div>

            {files.length > 0 && (
                <div className="m-4">
                    <p className="text-xl font-semibold">Preview</p>
                    <ul className="flex flex-wrap gap-2 text-black">
                        {files.map((file, idx) => (
                            <li key={idx} className="relative max-w-40">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => removeFile(file.name)}
                                        className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-md hover:bg-red-500"
                                    >
                                        <CircleX className="size-5 text-red-500 hover:text-white" />
                                    </button>
                                    <img
                                        className="size-40 rounded-lg"
                                        src={file.preview}
                                        alt="preview of image"
                                    />
                                </div>
                                <p className="break-words text-center mt-1">{file.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {errorFiles.length > 0 && (
                <div className="mt-4">
                    <p className="text-xl font-bold text-red-600">Rejected Files</p>
                    <ul className="flex flex-col gap-2 text-red-500">
                        {errorFiles.map((error, idx) => (
                            <li key={idx} className="flex items-center gap-2 border border-red-400 p-2 rounded-lg bg-red-100">
                                <span className="font-medium">{error.name}</span>
                                <span className="text-sm">({error.errors.join(", ")})</span>
                                <button
                                    type="button"
                                    onClick={() => removeErrorFile(error.name)}>
                                    <CircleX className="size-5 text-red-500 hover:text-red-700" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

// Add a displayName for better debugging
DropZone.displayName = 'DropZone';

export default DropZone;