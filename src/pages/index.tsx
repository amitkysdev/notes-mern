import { IoIosAddCircleOutline } from "react-icons/io";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "@nextui-org/tooltip";
import { Spinner } from "@nextui-org/spinner";

import CreateNoteModal from "@/components/cards/createNoteModal";
import DefaultLayout from "@/layouts/default";
import NotesCard from "@/components/cards/notes-Card";
import axiosInstance from "@/utils/axiosInstance";
import { Notes } from "@/types/index";

export default function IndexPage() {
  const createNoteDisclosure = useDisclosure();
  const [notes, setNotes] = useState<Notes | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const getAllNotes = async () => {
    try {
      setLoading(true); // Start loading
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Artificial delay
      const response = await axiosInstance.get("/all-notes");

      setNotes(response.data.notes);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getAllNotes();

    return () => {};
  }, []);

  return (
    <DefaultLayout>
      {/* Button to open CreateNoteModal */}
      <Tooltip className="capitalize" color={"success"} content={"Add notes"}>
        <button
          className="fixed bottom-6 right-6 z-50 border-none hover:bg-[#022C22] rounded-full p-1 transition-colors duration-300 focus:outline-none"
          onClick={createNoteDisclosure.onOpen} // Open the modal
        >
          <IoIosAddCircleOutline className="text-4xl text-green-600 lg:text-6xl" />
        </button>
      </Tooltip>

      {/* Conditional rendering for loading state */}
      {loading ? (
        <div className="flex items-center justify-center mt-[140px] text-center">
          <Spinner />
        </div>
      ) : notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NotesCard key={note._id} getAllNotes={getAllNotes} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-[140px] text-center">
          <h3 className="text-2xl font-bold antialiased tracking-wide leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-[#D946EF] to-pink-500">
            Zero notes? Your notepad as blank as your carrier!
          </h3>
        </div>
      )}

      {/* Create post modal */}
      <CreateNoteModal
        getAllNotes={getAllNotes}
        isOpen={createNoteDisclosure.isOpen}
        onClose={createNoteDisclosure.onClose}
      />
    </DefaultLayout>
  );
}
