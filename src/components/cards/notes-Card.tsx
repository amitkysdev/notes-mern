import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/modal";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiPushpinLine } from "react-icons/ri";
import { RiPushpinFill } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosInstance";
import { Note } from "@/types";
import UpdateNoteModal from "@/components/cards/updateNoteModal";
import DeleteNoteModal from "@/components/cards/deleteNoteModal";

export default function NotesCard({
  note,
  getAllNotes,
}: {
  note: Note;
  getAllNotes: any;
}) {
  // Separate disclosures for each modal
  const updateNoteDisclosure = useDisclosure();
  const deleteNodeDisclosure = useDisclosure();
  const [isPinned] = useState(note.isPinned);
  const handlePin = async () => {
    try {
      const pinStatus = !isPinned;

      const response = await axiosInstance.put(
        `/update-note-ispinned/${note._id}`,
        {
          isPinned: pinStatus,
        },
      );

      if (response.status == 200 || response.data.error == false) {
        getAllNotes();
        // setisPinned(pinStatus);
        if (isPinned) {
          toast.success("Unpinned");
        } else {
          toast.success("Pinned");
        }
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error("something went wrong");
      } else {
        toast.error("server issue while pinning notes");
      }
    }
  };

  return (
    <div className="">
      <Card className="shadow-lg border border-gray-600">
        <CardHeader className="flex flex-row justify-between">
          <h1>{note.title}</h1>
          <button onClick={handlePin}>
            {isPinned ? (
              <RiPushpinFill className="text-green-500 text-lg" />
            ) : (
              <RiPushpinLine className="text-lg" />
            )}
          </button>
        </CardHeader>
        <Divider />

        <CardBody>
          <p>{note.content}</p>
        </CardBody>
        <Divider />

        <CardFooter className="flex justify-end gap-x-1">
          <button
            className="bg-black rounded-full p-1 cursor-pointer"
            onClick={updateNoteDisclosure.onOpen}
          >
            <RiEdit2Line className="text-primary-500 text-xl" />
          </button>
          <button
            className="bg-black rounded-full p-1 cursor-pointer"
            onClick={deleteNodeDisclosure.onOpen}
          >
            <MdDelete className="text-red-500 text-xl" />
          </button>
        </CardFooter>
      </Card>

      {/* Edit Modal */}
      <UpdateNoteModal
        getAllNotes={getAllNotes}
        isOpen={updateNoteDisclosure.isOpen}
        note={note}
        onClose={updateNoteDisclosure.onClose}
      />
      {/* Delete Modal */}
      <DeleteNoteModal
        getAllNotes={getAllNotes} // main function to update latest notes
        isOpen={deleteNodeDisclosure.isOpen}
        noteId={note._id}
        onClose={deleteNodeDisclosure.onClose}
      />
    </div>
  );
}
