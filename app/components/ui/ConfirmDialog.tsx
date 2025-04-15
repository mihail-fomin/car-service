import BaseButton from './BaseButton';
import { useEffect } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Удалить',
  cancelText = 'Отмена'
}: ConfirmDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 z-[100]"
        onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/30" />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full max-w-sm p-6 bg-gray-800 rounded-lg"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-lg font-medium text-gray-200">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {description}
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <BaseButton
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600"
            >
              {cancelText}
            </BaseButton>
            <BaseButton
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-500"
            >
              {confirmText}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
} 