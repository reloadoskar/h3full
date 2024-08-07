
export default function ModalDialog({ open, close, children }) {
    
    return (
        <div className={`relative z-10 ${!open ? "hidden" : ""}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity"></div>

            <div  className="flex fixed inset-0 z-10 w-screen mx-auto my-auto">
            {/* <div className="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto"> */}
                {/* <div ref={ref} className="flex p-4 sm:items-center sm:p-0"> */}
                    {children}                   
                {/* </div> */}
            </div>
        </div>
    )
}
