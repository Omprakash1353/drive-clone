import { QUERIES } from "~/server/db/queries";
import DriveContents from "./drive-contents";

interface GoogleDriveCloneProps {
  params: Promise<{ folderId: string }>;
}

export default async function GoogleDriveClone(props: GoogleDriveCloneProps) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}
