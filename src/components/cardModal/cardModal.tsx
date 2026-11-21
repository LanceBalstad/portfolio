import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import "./cardModal.css";

type CardModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const CardModal = ({ open, title, onClose, children }: CardModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="card-modal"
      aria-labelledby="card-modal-title"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="card-modal-content">
        <div className="card-modal-header">
          <h2 id="card-modal-title" className="card-modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="card-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default CardModal;
