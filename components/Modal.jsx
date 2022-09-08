import * as React from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";

export const Modal = ({ index, setIsOpen, item, sheetRef }) => {
 
  const points = ["30%", "50%"];

  return (
      <BottomSheet
        key={index}
        ref={sheetRef}
        snapPoints={points}
        enablePanDownToClose={true}
      onClose={() => setIsOpen(false)}
      
      >
        <BottomSheetView>
        <View style={{ background: "black" }}>
          <Text>{item.terminal}</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};
