function UploadModelBtn({onFileChange}) {
    
    return (
        <label htmlFor="dropzone-file" id="uploadBtn"
            className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50">
            <div className="mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g id="Upload 02">
                        <path id="icon"
                            d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                            stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                </svg>
            </div>
            <h2 className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">ACHIBO .GLB</h2>
            <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Haz click o arrastra el archivo</h4>
            <input id="dropzone-file" type="file" accept=".glb" className="hidden" onChange={onFileChange}/>
        </label>
    );
}

export default UploadModelBtn;