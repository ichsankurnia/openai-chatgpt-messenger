import React from 'react';

type Props = {
    modalId: string,
    onContinue: React.MouseEventHandler<HTMLButtonElement>
};

// https://daisyui.com/components/modal/
const LogoutModal: React.FC<Props> = ({ modalId, onContinue }) => {
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <label htmlFor={modalId} className="modal modal-bottom sm:modal-middle cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Confirmation</h3>
                    <p className="py-4">Are you sure want to logout?</p>
                    <div className='flex justify-end space-x-2'>
                        <label className='btn' htmlFor={modalId}>No, Cancel</label>
                        <button className='btn' onClick={onContinue}>Yes, I'm sure</button>
                    </div>
                </label>
            </label>
        </>
    );
}

export default LogoutModal;