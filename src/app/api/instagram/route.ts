export async function POST(request: Request) {
  return Response.json(
    { message: "User Data Deleted Sucessfully" },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  return Response.json(
    { message: "User Data Deleted Sucessfully" },
    { status: 200 }
  );
}
