import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Note } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  note: Note;
  getAllNotes: () => void;
}

export default function UpdateNoteModal({
  isOpen,
  onClose,
  note,
  getAllNotes,
}: CreateNoteModalProps) {
  const [tags, setTags] = useState<string[]>(note.tags || []); // default as notes data comes
  const [tagInput, setTagInput] = useState<string>("");
  const navigate = useNavigate();

  const handleTagChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTagInput(value);

    // Add tag if a comma is entered
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput(""); // Clear the input field after adding the tag
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Extract form data
    const title = formData.get("title");
    const content = formData.get("content");

    try {
      const response = await axiosInstance.put(`/edit-note/${note._id}`, {
        title,
        content,
        tags,
      });

      if (response.status == 200 && response.data.error == false) {
        onClose(false);
        getAllNotes();
        navigate("/");
        toast.success("Notes updated.");
      }
    } catch (error: any) {
      if (error.response.data.error == true) {
        toast.error(error.response.data.message);
      } else {
        toast.error("error while updating notes");
      }
    }
  };

  return (
    <Modal
      backdrop="blur"
      className="dark text-foreground bg-background shadow-lg shadow-gray-700/40 "
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose(open)}
      // placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Notes
            </ModalHeader>
            <ModalBody>
              <Form
                action=""
                id="create-notes-form"
                validationBehavior="native"
                onSubmit={handleForm}
              >
                <Input
                  isRequired
                  defaultValue={note.title}
                  errorMessage="Title is required"
                  label="Title"
                  labelPlacement="outside"
                  name="title"
                  variant="bordered"
                />
                <Textarea
                  isClearable
                  isRequired
                  defaultValue={note.content}
                  errorMessage="write any description"
                  label="Description"
                  name="content"
                  variant="underlined"
                />
                <Input
                  label="Tags"
                  name="tags"
                  placeholder="comma separate"
                  value={tagInput}
                  variant="underlined"
                  onChange={handleTagChange}
                />
                <div className="flex gap-x-1 flex-shrink gap-y-1  flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#27272A] px-1 rounded-md flex items-center text-sm"
                    >
                      {tag}
                      <button
                        className="ml-1 text-red-500"
                        type="button"
                        onClick={() => removeTag(tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" form="create-notes-form" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
