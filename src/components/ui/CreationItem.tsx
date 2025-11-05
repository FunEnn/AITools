import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";

interface CreationItemProps {
  item: {
    id: number;
    prompt: string;
    type: string;
    content: string;
    created_at: string;
  };
  onDelete?: (id: number) => void;
  deleteText?: string;
  deleteConfirmText?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function CreationItem({
  item,
  onDelete,
  deleteText = "删除",
  deleteConfirmText = "确定要删除这条创作吗？",
  confirmText = "确认",
  cancelText = "取消",
}: CreationItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showDeleteModal) {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
    }
  }, [showDeleteModal]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(item.id);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showDeleteModal) {
        setShowDeleteModal(false);
      }
    };

    if (showDeleteModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showDeleteModal]);

  return (
    <div className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <button
          type="button"
          className="flex-1 flex justify-between items-center gap-4 cursor-pointer text-left"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <div className="flex-1">
            <h2 className="font-medium">{item.prompt}</h2>
            <p className="text-gray-500 text-xs mt-1">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
          <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full text-xs whitespace-nowrap">
            {item.type}
          </span>
        </button>
        {onDelete && (
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex items-center justify-center"
              aria-label={deleteText}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <Image
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
                width={400}
                height={300}
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}

      {mounted &&
        showDeleteModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <button
              type="button"
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleCancelDelete}
              aria-label={cancelText}
            />
            <div
              className={`relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full z-10 transition-all duration-200 ${
                isAnimating
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2"
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-description"
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  id="delete-modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {deleteText}
                </h3>
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                  aria-label={cancelText}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p id="delete-modal-description" className="text-gray-600 mb-6">
                {deleteConfirmText}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
