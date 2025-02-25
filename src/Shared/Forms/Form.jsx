import { useForm } from 'react-hook-form';
import DropZone from '../DropZone/DropZone';
import { useRef, useState } from 'react';

const MyForm = ({ fields, handler, formName, btnName, reDirection, dropDown, signInMethod }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const dropzoneRef = useRef(null);

    // separate state for file uploads
    const [fileFields, setFileFields] = useState({});
    const dropOptions = [];

    // Called when files change in DropZone
    const handleFileChange = (fieldName, files) => {
        setFileFields(prev => ({
            ...prev,
            [fieldName]: files
        }));
    };

    // triggers on submission
    const handleForm = data => {
        // Combine form data with file data
        const formData = {
            ...data,
            ...fileFields
        };
        handler(formData); // send data to parent component
        reset();
        dropzoneRef.current.clearFiles();
        setFileFields({});
    };

    if (dropDown) {
        dropDown.forEach(item => {
            if (item.value) {
                dropOptions.push(item);
            }
        });
    }
    // console.log(dropDown);
    // dropMenuValues.map(value => console.log(value))


    return (
        <div className="hero bg-base-200 min-h-screen w-full">
            <div className="hero-content flex-col w-full">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{formName}</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(handleForm)} className="card-body">
                        {fields?.map((field) => (
                            <div key={field?.name} className="form-control">
                                <label className="label">
                                    <span className="label-text">{field?.label}</span>
                                </label>
                                {field?.type === 'textBox' ? (
                                    <textarea
                                        {...register(field?.name)}
                                        placeholder={field?.label}
                                        className="textarea textarea-primary"
                                    />
                                ) : field?.type === 'image' ? (
                                    <DropZone
                                        onFilesChange={(files) => handleFileChange(field.name, files)}
                                        required
                                        ref={dropzoneRef}
                                    />
                                ) : (
                                    <input
                                        {...register(field?.name)}
                                        type={field?.type}
                                        placeholder={field?.label}
                                        className="input input-bordered"
                                        required
                                    />
                                )}
                            </div>
                        ))}
                        {
                            dropDown && <div className='mt-2 text-xl'>
                                <label className='font-medium'>{dropDown[0].label} </label>
                                <select
                                    className='border-2 rounded-lg'
                                    {...register(dropDown[0].name)}>
                                    {
                                        dropOptions.map(value => <option
                                            key={value.value}
                                            value={value.value}
                                            required
                                            >{value.label}</option>)
                                    }
                                </select>
                            </div>
                        }
                        {reDirection}
                        {signInMethod}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                {btnName}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyForm;