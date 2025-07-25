import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input";
import Lottie from 'react-lottie';
import { getAnimationOptions } from '../../../../../../lib/utils';
import animationData from '../../../../../../assets/lottie-json.json';
import { SEARCH_CONTACTS_ROUTE } from '../../../../../../lib/utils/constants';
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar.jsx";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
// import apiClient from "../../../../../../lib/utils"; // Ensure correct import
import apiClient from "../../../../../../lib/utils/apiClient"; // ⬅️ Direct file path

const NewDm = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1d25] border-none mb-2 p- text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none  text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-white">
              Please select a Contact
            </DialogTitle>
            <DialogDescription className="text-white"></DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Search Contacts"
            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            onChange={(e) => searchContacts(e.target.value)}
          />

          <ScrollArea className="h-[250px] mt-5">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div key={contact._id} className="flex gap-3 items-center cursor-pointer">
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={contact.image}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div className="uppercase h-12 w-12 text-md border border-white flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                          {contact.firstName?.[0] || contact.email?.[0] || "U"}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {[contact.firstName, contact.lastName].filter(Boolean).join(" ")}
                    </span>
                    <span className="text-sm text-gray-300">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex mt-5 flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={200}
                width={200}
                options={getAnimationOptions(animationData)}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-2xl transition-all duration-300 text-center">
                <h3 className="poppins-medium ">
                  Hi <span className="text-purple-500">!</span>Search New <span className="text-purple-500">Contact</span>
                  <span className="text-purple-500">.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
