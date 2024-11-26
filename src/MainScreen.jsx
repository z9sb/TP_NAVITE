import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import HomeQuiz from "./Quiz.jsx";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function MainScreen() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [onSearch, setOnSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(false);

  const homeMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend-plum-five.vercel.app/api/moviespopular"
      );
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao carregar a lista de filmes");
      setLoading(false);
    }
  };

  useEffect(() => {
    homeMovies();
  }, []);

  const SearchMovie = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend-plum-five.vercel.app/api/search",
        { params: { query } }
      );
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao carregar a lista de filmes");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onSearch) {
      SearchMovie(onSearch);
    }
  }, [onSearch]);

  const handleOpen = (movie) => {
    setMovieSelected(movie);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style_modal = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  if (showQuiz) {
    return <HomeQuiz id_movie={movieSelected.id} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text>Search Component Placeholder</Text>
      </View>

      <View style={styles.listContainer}>
        {error ? (
          <Text>{error}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : movies.length > 0 ? (
          <FlatList
            data={movies}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOpen(item)}>
                <View style={styles.card}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.title}>
                    {item.title ? item.title : item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>Nenhum resultado encontrado</Text>
        )}
      </View>

      <Modal
        visible={open}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={style_modal}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movieSelected.backdrop_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.modalTitle}>
              {movieSelected.title ? movieSelected.title : movieSelected.name}
            </Text>
            <Text style={styles.modalText}>
              Deseja começar um quiz com o item acima?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={() => setShowQuiz(true)}
                style={styles.button}
              >
                Sim
              </Button>
              <Button
                mode="outlined"
                onPress={handleClose}
                style={styles.button}
              >
                Não
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  search: {
    padding: 10,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    width: width - 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    padding: "10px 10px 20px 10px",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    margin: 5,
    width: "40%",
  },
});
