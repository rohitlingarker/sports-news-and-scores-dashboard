/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Sports from "./Sports";
import Teams from "./Teams";
import "./index.css";
import {
  usePreferenceState,
  usePreferencesDispatch,
} from "../../context/preferences/context";
import {
  getPreferences,
  setPreferences,
} from "../../context/preferences/actions";
import { filterArticles } from "../../context/articles/actions";
import {
  useArticleState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { filterMatches } from "../../context/matches/actions";
import {
  useMatchState,
  useMatchesDispatch,
} from "../../context/matches/context";

export default function Preferences() {
  const [isOpen, setIsOpen] = useState(false);
  const preferenceState = usePreferenceState();
  const preferencesDispatch = usePreferencesDispatch();
  const articleState = useArticleState();
  const articlesDispatch = useArticlesDispatch();
  const matchState = useMatchState();
  const matchesDispatch = useMatchesDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (preferenceState) setPreferences(preferenceState);
  };

  useEffect(() => {
    // if (preferencesDispatch) getPreferences(preferencesDispatch);
    (async () => {
      if (preferencesDispatch) getPreferences(preferencesDispatch);

      if (
        articlesDispatch &&
        articleState &&
        articleState.filteredArticles.length &&
        preferenceState
      ) {
        filterArticles(
          articlesDispatch,
          articleState.originalArticleList,
          preferenceState
        );
      }
    })();
  }, []);
  // useEffect to filter articles based on preferenceState
  useEffect(() => {
    if (articlesDispatch && articleState && preferenceState)
      filterArticles(
        articlesDispatch,
        articleState.originalArticleList,
        preferenceState
      );

    if (matchesDispatch && matchState && preferenceState)
      filterMatches(
        matchesDispatch,
        matchState.originalMatches,
        preferenceState
      );
  }, [preferenceState, articlesDispatch]);

  return (
    <div className="iniline-block">
      <div className="">
        <button type="button" onClick={openModal} className="">
          Preferences
        </button>
      </div>

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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose your preferences
                  </Dialog.Title>
                  <Sports />
                  <Teams />

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
    </div>
  );
}
