import dayjs from "dayjs";
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default function SidebarNoteItem({ noteId, note }) {
  const { title, content = "", updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      // 1.服务端组件到客户端组件的数据传递，需要能够序列化，否则报错
      // fun={() => {}}  此参数不能序列化,会报错
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      {/* 2.这里通过props.children传给客户端组件,实际上也会在服务端被编译，然后传给客户端渲染，所以dayjs的包不会被打包到客户端的bundel */}
      {/* <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
      </header> */}
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
