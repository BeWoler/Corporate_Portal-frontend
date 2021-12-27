import { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import FriendsService from "../../services/FriendsService";
import "./friendsRequest.css";

const FriendsRequest: FC = () => {
  const [requests, setRequests] = useState<any>([]);
  const receiverId = window.location.href.split("/").reverse()[0];

  const getRequests = async () => {
    const response = await FriendsService.getRequests(receiverId);
    setRequests(response.data);
  };

  const acceptRequest = async (
    receiverId: string,
    senderId: string,
    requestId: string
  ) => {
    const response = await FriendsService.accept(
      receiverId,
      senderId,
      requestId
    );
    return response;
  };

  const declineRequest = async (requestId: string) => {
    const response = await FriendsService.decline(requestId);
    return response;
  };

  useEffect(() => {
    FriendsService.getRequests(receiverId).then(res => setRequests(res.data));
    return () => setRequests(null);
  }, [receiverId]);

  const btnStyles = {
    margin: "1rem .5rem 0 .5rem",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <div className="friends__requests">
      {requests.length > 0
        ? requests.map((request: any) => {
            return (
              <div key={request._id} className="requests">
                {request.sender.firstName} {request.sender.lastName} wants to
                add you as a friend
                <div>
                  <Button
                    variant="contained"
                    sx={btnStyles}
                    onClick={async () => {
                      await acceptRequest(
                        request.receiver,
                        request.sender._id,
                        request._id
                      );
                      getRequests();
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    sx={btnStyles}
                    onClick={async () => {
                      await declineRequest(request._id);
                      getRequests();
                    }}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FriendsRequest;
