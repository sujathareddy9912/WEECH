import React, {FC, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../Utils/colors';
import Icon from '../../Component/Icons/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface gameListProps {
  id: number;
}

const Game: FC = () => {
  const data: gameListProps[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(true);

  const _renderGameList: ListRenderItem<gameListProps> = ({item}) => {
    return (
      <TouchableOpacity style={styles.games} onPress={() => setPlaying(true)}>
        <Icon
          origin="Ionicons"
          name="game-controller"
          size={32}
          color={COLORS.RED_COLOR}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={isVisible}>
      <View
        style={[
          styles.container,
          {
            paddingTop: useSafeAreaInsets().top,
          },
        ]}>
        <View style={[styles.container, {flex: isPlaying ? 1 : 4}]} />
        <View
          style={[
            styles.lowerContainer,
            {paddingBottom: useSafeAreaInsets().bottom},
          ]}>
          {isPlaying ? (
            <View style={styles.gameContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setVisible(false);
                  setPlaying(false);
                }}>
                <Icon
                  origin="Ionicons"
                  name="close"
                  size={16}
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
              <Icon
                origin="Ionicons"
                name="game-controller"
                size={200}
                color={COLORS.RED_COLOR}
              />
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={_renderGameList}
              horizontal
              contentContainerStyle={styles.contentContainer}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.WHITE,
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  games: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    height: 64,
    width: 64,
    borderRadius: 32,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
