import {IKContext,IKUpload} from 'imagekitio-react';
import { useRef } from 'react';
import {toast } from 'react-toastify';
const authenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
        if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        // Parse and destructure the response JSON for upload credentials.
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};
export default function Upload({setProgress,children,type,setData}) {
    const onSuccess = (response) => {
        console.log("Image uploaded successfully:", response);
        // You can handle the response here, e.g., save the image URL to state
        setData(response);
        toast.success('Image uploaded successfully!');
    }
    const onError = (error) => {
        console.error("Image upload error:", error);
        toast.error('Image upload failed!');
    }
    const onUploadProgress = (progress) => {
        console.log("Upload progress:", progress);
        // You can update a state variable here to show the upload progress in the UI
        // For example, you could use a state variable to show a progress bar or percentage
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    };
    const ref = useRef(null);
    return (
        <IKContext
            publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            authenticator={authenticator}
            onError={(error) => console.error("ImageKit error:", error)}
        >
            <IKUpload
                useUniqueFileName={true}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                accept={`${type}/*`}
                className='hidden'
                ref={ref}
            />
            <div onClick={() => ref.current.click()}>{children}</div>
        </IKContext>
    )
}