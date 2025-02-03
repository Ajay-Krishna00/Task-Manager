import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  Avatar,
  Box,
  Button,
} from "@chakra-ui/react";
import { StyledText } from "./StyledComponenets";
import { useState } from "react";

const images = [
  "https://bit.ly/naruto-sage",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5908420/pexels-photo-5908420.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/139392/checkmate-chess-resignation-conflict-139392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/16883139/pexels-photo-16883139/free-photo-of-gray-lamborghini-huracan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/30399231/pexels-photo-30399231/free-photo-of-playful-giant-panda-in-taipei-zoo-branch.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg",
  "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/191240/pexels-photo-191240.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export default function AccountPicModal({ isOpen, onclose }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);

      // Create an object URL for the selected image for preview
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };

  // Handle image submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // try {
    //   const response = await fetch('/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   const data = await response.json();
    //   console.log("Image uploaded successfully:", data);
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // }
  };
  return (
    <Modal isOpen={isOpen} onClose={onclose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={"25px"}>
          <StyledText fSize="24px">Select a profile picture</StyledText>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody p={"8px"}>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>
                <StyledText>Choose</StyledText>
              </Tab>
              <Tab>
                <StyledText>Upload</StyledText>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <StyledText>Choose a profile picture</StyledText>
                <Box
                  mt={"20px"}
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {images.map((image, i) => {
                    return (
                      <Avatar
                        key={i}
                        src={image}
                        size="2xl"
                        pr={"10px"}
                        pb={"10px"}
                        onClick={() => {}}
                        _hover={{ cursor: "pointer" }}
                      />
                    );
                  })}
                </Box>
              </TabPanel>
              <TabPanel>
                <StyledText mb={"20px"}>Upload a profile picture</StyledText>
                <form onSubmit={handleSubmit}>
                  {/* <input  type="file" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', marginTop: '20px' }} />}
                  <Button  mt='20px' type="submit" variant={'outline'} color={'white'} bg={'Black'} width={'100%'} 
            fontSize={'18px'} p={'4px'}
          _hover={{bg:'blue.500'}}>Upload</Button> */}
                  <Box
                    p={4}
                    maxW="400px"
                    mx="auto"
                    borderWidth={1}
                    borderRadius="md"
                    textAlign="center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        padding: "10px",
                        backgroundColor: "#f7f7f7",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        width: "100%",
                        marginBottom: "20px",
                        cursor: "pointer",
                      }}
                    />

                    {imagePreview && (
                      <Box>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            marginTop: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </Box>
                    )}

                    <Button
                      mt="20px"
                      type="submit"
                      variant="outline"
                      color="white"
                      bg="black"
                      width="100%"
                      fontSize="18px"
                      p="10px"
                      _hover={{
                        bg: "gray.700",
                      }}
                      _active={{
                        bg: "gray.800",
                      }}
                      _focus={{
                        borderColor: "gray.400",
                      }}
                    >
                      Upload Image
                    </Button>
                  </Box>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
