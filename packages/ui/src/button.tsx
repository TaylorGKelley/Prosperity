import { Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(TouchableOpacity);
const StyledText = styled(Text);

export const Button = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <StyledView onPress={onPress} className="bg-primary p-4 rounded-xl">
    <StyledText className="text-white font-bold text-center">
      {label}
    </StyledText>
  </StyledView>
);
