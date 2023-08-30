        import { Fragment, Suspense, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArticleItem } from "../../context/articles/reducer";
import React from 'react';
// import ArticleContent from './ArticleContent';
const ArticleContent = React.lazy(()=>import("./ArticleContent"))

interface Props{
    article:ArticleItem
}

export default function ArticleListItem(props: Props) {
    const article = props.article;
    const [isOpen, setIsOpen] = useState(false)
  
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
    return (
      <div className='border m-1'>
            <p className='text-gray-700'>
                {article.sport.name}
            </p>
        <div className='flex h-20'>
            <img className='h-full aspect-auto' src={article.thumbnail} />
            <div>
                <h2 className='font-bold'>{article.title}</h2>
                <p>{article.summary}</p>
            </div>
        </div>
        
        <div className="">
          <button
            type="button"
            onClick={openModal}
            className="font-extralight italic underline text-end w-full mr-40"
          >
            Read More
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
                      {article.title}
                    </Dialog.Title>
                    <div className="mt-2">
                        <Suspense fallback={<div className='suspense'>Loading...</div>}>
                            <ArticleContent id={article.id}/>

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
    )
  }
  