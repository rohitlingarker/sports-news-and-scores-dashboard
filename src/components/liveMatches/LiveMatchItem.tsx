import { Fragment, useEffect, useState } from "react";
import { fetchMatchDetails } from "../../context/matches/actions";
import { Dialog, Transition } from "@headlessui/react";
import "./index.css";
import { MatchItem } from "../../context/matches/types";

type Props = {
  match: MatchItem;
};

export default function LiveMatchItem(props: Props) {
  const [match, setMatch] = useState(props.match);
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const refresh = async () => {
    setIsRotating(true);
    const matchData = await fetchMatchDetails({ id: match.id });
    setMatch(matchData);
    setIsRotating(false);
  };
  // console.log("score"+match.score);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openModal():
    | import("react").MouseEventHandler<HTMLHeadingElement>
    | undefined {
    return () => {
      // console.log('open');
      setIsOpen(true);
    };
  }

  function closeModal() {
    // console.log('close');
    setIsOpen(false);
  }

  return (
    <>
      {match.isRunning && (
        <div
          onClick={refresh}
          className={`${
            isRotating ? "rotating" : ""
          } float-right cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      )}
      <h2
        onClick={openModal()}
        className="text-lg text-white font-semi-bold cursor-pointer"
      >
        {match.sportName}
      </h2>
      <p onClick={openModal()} className="text-xs text-slate-400 mb-2">
        {match.location}
      </p>
      <p
        onClick={openModal()}
        className={`text-base font-light flex justify-between`}
      >
        {" "}
        {match.teams[1].name}{" "}
        <span>
          {match.score !== undefined ? match.score[match.teams[1].name] : ""}
        </span>
      </p>
      <p
        onClick={openModal()}
        className={`text-base font-light flex justify-between`}
      >
        {" "}
        {match.teams[0].name}{" "}
        <span>
          {match.score !== undefined ? match.score[match.teams[0].name] : ""}
        </span>
      </p>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {match.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{match.story}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
