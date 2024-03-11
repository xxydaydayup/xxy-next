// 使用 use client ，以下组件就从服务端组件变为客户端组件，则此组件使用的包会被打包进客户端的bundle中

//  React Server Compoent 的好处之一，服务端组件的代码不会打包到客户端的 bundle 中
// "use client";

import dayjs from "dayjs";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(3000);
  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <>
      <ul className="notes-list">
        {arr.map(([noteId, note]) => {
          return (
            <li key={noteId}>
              <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
            </li>
          );
        })}
      </ul>
    </>

    // <ul className="notes-list">
    //   {arr.map(([noteId, note]) => {
    //     const { title, updateTime } = JSON.parse(note);
    //     return (
    //       <li key={noteId}>
    //         <header className="sidebar-note-header">
    //           <strong>{title}</strong>
    //           <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
    //         </header>
    //       </li>
    //     );
    //   })}
    // </ul>
  );
}
