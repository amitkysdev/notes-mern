import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosInstance";

interface CreateNoteModalProps {
  isOpen: boolean;
  noteId: any;
  getAllNotes: () => void; // Add this prop
  onClose: (open: boolean) => void;
}
export default function DeleteNoteModal({
  isOpen,
  onClose,
  getAllNotes,
  noteId,
}: CreateNoteModalProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.status == 200 && response.data.error == false) {
        getAllNotes();
        onClose(false);
        navigate("/");
        toast.success("Notes deleted");
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Modal
      backdrop="blur"
      className="dark text-foreground bg-background shadow-lg shadow-gray-700/40 "
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose(open)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Modal
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
