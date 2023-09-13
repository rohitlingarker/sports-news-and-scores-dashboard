import { Fragment, Suspense, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArticleItem } from "../../context/articles/reducer";
import ArticleContent from "../articles/ArticleContent";
// import ArticleContent from './ArticleContent';

interface Props {
  article: ArticleItem;
}

export default function FavItem(props: Props) {
  const article = props.article;
  const [isOpen, setIsOpen] = useState(false);
  const [isSliding, setSliding] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function slideOut() {
    setSliding(false);
  }

  function slideIn() {
    setSliding(true);
  }

  function formatDate(s: string) {
    const d = new Date(s);
    // return date in "Month date, year ,time" format

    return `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getDate()},${d.getFullYear()} `;
  }

  return (
    <div
      onMouseEnter={slideIn}
      onMouseLeave={slideOut}
      className="rounded mt-2 p-2 flex  shadow-md"
    >
      <div className="w-1/6  relative mr-2 flex items-center justify-center ">
        <img
          className=" aspect-auto mx-auto mt-2 rounded"
          src={article.thumbnail}
        />
      </div>
      <div className="inline-block w-4/5">
        <div>
          <h2 className="text-lg font-semibold ">{article.title}</h2>
          <div className="text-base h-12 text-ellipsis overflow-hidden whitespace-pre-wrap">{article.summary}</div>
        </div>

        <div className="p-2 flex justify-between overflow-hidden">
          <p>{formatDate(article.date)}</p>
          <Transition
            show={isSliding}
            enter="transition ease-ou-in delay-100 duration-1000 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition ease-in-out duration-1000 transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <button
              type="button"
              onClick={openModal}
              className="font-extralight italic underline w-full hover:text-blue-300"
            >
              Read More
            </button>
          </Transition>
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
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {article.title}
                    </Dialog.Title>
                    <img className="w-4/5 aspect-auto m-auto rounded-lg" src={article.thumbnail} />
                    <div className="mt-2">
                      <Suspense
                        fallback={<div className="suspense">Loading...</div>}
                      >
                        <ArticleContent id={article.id} />
                      </Suspense>
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
      </div>
    </div>
  );
}
