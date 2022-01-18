import { FC, useEffect, useState, useContext } from "react";
import { Context } from "../../index";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import FriendsService from "../../services/FriendsService";
import "./friendsRequest.sass";

const FriendsRequest: FC = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const [requests, setRequests] = useState<any>([]);
  const receiverId = location.pathname.split("/").reverse()[0];

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
    store.checkAuth();
    return response;
  };

  const declineRequest = async (requestId: string) => {
    const response = await FriendsService.decline(requestId);
    return response;
  };

  useEffect(() => {
    FriendsService.getRequests(receiverId).then((res) => setRequests(res.data));
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
      {requests?.length > 0 ? <hr /> : null}
      <div className="friends__requests__box">
        {requests?.length > 0
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
    </div>
  );
};

export default FriendsRequest;
