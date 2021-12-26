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
    getRequests();
    return () => setRequests(null);
  }, []);

  const btnStyles = {
    margin: "1rem 1rem 0 0",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <div className="friends__requests">
      {requests
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
