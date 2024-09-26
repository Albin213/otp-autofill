// // // Playlist.js
// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { RiDeleteBin6Line } from "react-icons/ri";
// // import { MdOutlineEdit } from "react-icons/md";
// // import dummyData from "./dummyData"; // Importing the dummy data

// // function Playlist(props) {
// //   const [playlists, setPlaylists] = useState([]);

// //   useEffect(() => {
// //     // Instead of API call, using dummy data to set playlists
// //     setPlaylists(dummyData);
// //   }, []);

// //   return (
// //     <>
// //       {playlists.length > 0 ? (
// //         playlists.map((item, index) => {
// //           return (
// //             <div key={index}>
// //               <div className="w-full h-15 mt-8 bg-[#495F85] flex">
// //                 <div className="w-[60%] h-full p-2 flex text-white">
// //                   <img
// //                     src={item.playList_image}
// //                     className="w-11 h-11 rounded-full object-cover"
// //                     alt="Playlist Thumbnail"
// //                   />
// //                   <div className="ps-2 flex justify-center items-center">
// //                     <p>{item.playList_heading}</p>
// //                   </div>
// //                 </div>

// //                 <div className="w-[40%] h-full p-1 text-white flex items-center justify-evenly">
// //                   <RiDeleteBin6Line
// //                     className="text-2xl cursor-pointer hover:text-red-500"
// //                     onClick={() => {
// //                       props.setSelectedPlaylistId(item.id);
// //                       props.setIsDeletePlaylistPopup(true);
// //                     }}
// //                   />
// //                   <button
// //                     className="w-[150px] h-10 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]"
// //                     onClick={() => {
// //                       props.setSelectedPlaylistId(item.id);
// //                       props.setSelectedPlaylistData({
// //                         head: item.playList_heading,
// //                         category: item.category,
// //                         videoArray: item.video,
// //                       });
// //                       props.setAddVideoPopUp(true);
// //                     }}
// //                   >
// //                     + Add Video
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full h-full">
// //                 <table className="w-full h-full">
// //                   <thead className="w-full h-12 bg-[#C5D8FF] text-black">
// //                     <tr>
// //                       <th className="w-[10%] text-start ps-2">Sl No.</th>
// //                       <th className="w-[20%] text-start">Video Heading</th>
// //                       <th className="w-[50%] text-start">Video Url</th>
// //                       <th className="w-[10%] text-start">Delete</th>
// //                       <th className="w-[10%] text-start">Edit</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="w-full h-14 bg-[#F9F9FF] border-b-2 border-[#C1C6D4] text-black">
// //                     {item.video.length > 0 &&
// //                       item.video.map((vid, ind) => {
// //                         return (
// //                           <tr
// //                             key={ind}
// //                             className="text-xs py-2 border-b-2 border-gray-300"
// //                           >
// //                             <td className="ps-2">{ind + 1}</td>
// //                             <td>{vid.video_heading}</td>
// //                             <td className="text-[#7698ef] hover:text-[#005DB8]">
// //                               <a href={vid.video_link} target="_blank" rel="noopener noreferrer">
// //                                 {vid.video_link}
// //                               </a>
// //                             </td>
// //                             <td>
// //                               <RiDeleteBin6Line
// //                                 className="text-2xl cursor-pointer hover:text-red-500"
// //                                 onClick={() => {
// //                                   props.setSelectedPlaylistId(item.id);
// //                                   props.setSelectedPlaylistData({
// //                                     head: item.playList_heading,
// //                                     category: item.category,
// //                                     videoArray: item.video,
// //                                     index: ind,
// //                                   });
// //                                   props.setIsDeleteVideoPopup(true);
// //                                 }}
// //                               />
// //                             </td>
// //                             <td>
// //                               <MdOutlineEdit
// //                                 className="text-2xl cursor-pointer hover:text-blue-500"
// //                                 onClick={() => {
// //                                   props.setSelectedPlaylistId(item.id);
// //                                   props.setSelectedPlaylistData({
// //                                     head: item.playList_heading,
// //                                     category: item.category,
// //                                     videoArray: item.video,
// //                                     index: ind,
// //                                   });
// //                                   props.setIsEditVideoPopup(true);
// //                                 }}
// //                               />
// //                             </td>
// //                           </tr>
// //                         );
// //                       })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           );
// //         })
// //       ) : (
// //         <div>No playlists</div>
// //       )}
// //     </>
// //   );
// // }

// // export default Playlist;


// "use client"
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdOutlineEdit } from "react-icons/md";
// import dummyData from "./dummyData"; // Importing the dummy data

// function Playlist(props) {
//   const [playlists, setPlaylists] = useState([]);

//   useEffect(() => {
//     setPlaylists(dummyData);
//   }, []);

//   const handleOnDragEnd = (result, playlistIndex) => {
//     if (!result.destination) return;

//     const items = Array.from(playlists[playlistIndex].video);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     const newPlaylists = [...playlists];
//     newPlaylists[playlistIndex].video = items;
//     setPlaylists(newPlaylists);
//   };

//   return (
//     <>
//       {playlists.length > 0 ? (
//         playlists.map((item, playlistIndex) => (
//           <div key={playlistIndex}>
//             <div className="w-full h-15 mt-8 bg-[#495F85] flex">
//               <div className="w-[60%] h-full p-2 flex text-white">
//                 <img
//                   src={item.playList_image}
//                   className="w-11 h-11 rounded-full object-cover"
//                   alt="Playlist Thumbnail"
//                 />
//                 <div className="ps-2 flex justify-center items-center">
//                   <p>{item.playList_heading}</p>
//                 </div>
//               </div>

//               <div className="w-[40%] h-full p-1 text-white flex items-center justify-evenly">
//                 <RiDeleteBin6Line
//                   className="text-2xl cursor-pointer hover:text-red-500"
//                   onClick={() => {
//                     props.setSelectedPlaylistId(item.id);
//                     props.setIsDeletePlaylistPopup(true);
//                   }}
//                 />
//                 <button
//                   className="w-[150px] h-10 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]"
//                   onClick={() => {
//                     props.setSelectedPlaylistId(item.id);
//                     props.setSelectedPlaylistData({
//                       head: item.playList_heading,
//                       category: item.category,
//                       videoArray: item.video,
//                     });
//                     props.setAddVideoPopUp(true);
//                   }}
//                 >
//                   + Add Video
//                 </button>
//               </div>
//             </div>

//             <div className="w-full h-full">
//               <table className="w-full h-full">
//                 <thead className="w-full h-12 bg-[#C5D8FF] text-black">
//                   <tr>
//                     <th className="w-[10%] text-start ps-2">Sl No.</th>
//                     <th className="w-[20%] text-start">Video Heading</th>
//                     <th className="w-[50%] text-start">Video Url</th>
//                     <th className="w-[10%] text-start">Delete</th>
//                     <th className="w-[10%] text-start">Edit</th>
//                   </tr>
//                 </thead>
//                 <DragDropContext
//                   onDragEnd={(result) =>
//                     handleOnDragEnd(result, playlistIndex)
//                   }
//                 >
//                   <Droppable droppableId={`droppable-${playlistIndex}`}>
//                     {(provided) => (
//                       <tbody
//                         className="w-full h-14 bg-[#F9F9FF] border-b-2 border-[#C1C6D4] text-black"
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                       >
//                         {item.video.map((vid, ind) => (
//                           <Draggable
//                             key={vid.video_link}
//                             draggableId={vid.video_link}
//                             index={ind}
//                           >
//                             {(provided) => (
//                               <tr
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="text-xs py-2 border-b-2 border-gray-300"
//                               >
//                                 <td className="ps-2">{ind + 1}</td>
//                                 <td>{vid.video_heading}</td>
//                                 <td className="text-[#7698ef] hover:text-[#005DB8]">
//                                   <a
//                                     href={vid.video_link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                   >
//                                     {vid.video_link}
//                                   </a>
//                                 </td>
//                                 <td>
//                                   <RiDeleteBin6Line
//                                     className="text-2xl cursor-pointer hover:text-red-500"
//                                     onClick={() => {
//                                       props.setSelectedPlaylistId(item.id);
//                                       props.setSelectedPlaylistData({
//                                         head: item.playList_heading,
//                                         category: item.category,
//                                         videoArray: item.video,
//                                         index: ind,
//                                       });
//                                       props.setIsDeleteVideoPopup(true);
//                                     }}
//                                   />
//                                 </td>
//                                 <td>
//                                   <MdOutlineEdit
//                                     className="text-2xl cursor-pointer hover:text-blue-500"
//                                     onClick={() => {
//                                       props.setSelectedPlaylistId(item.id);
//                                       props.setSelectedPlaylistData({
//                                         head: item.playList_heading,
//                                         category: item.category,
//                                         videoArray: item.video,
//                                         index: ind,
//                                       });
//                                       props.setIsEditVideoPopup(true);
//                                     }}
//                                   />
//                                 </td>
//                               </tr>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </tbody>
//                     )}
//                   </Droppable>
//                 </DragDropContext>
//               </table>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>No playlists</div>
//       )}
//     </>
//   );
// }

// export default Playlist;

