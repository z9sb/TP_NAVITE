import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function HomeQuiz({ id_movie }) {
  const [moviesAlternate, setMoviesAlternate] = useState([]);
  const [moviePrincipal, setMoviePrincipal] = useState();
  const [moviesAlternateDetails, setMoviesAlternateDetails] = useState([]);
  const [questionsMovies, setQuestionsMovies] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [pontuation, setPontuation] = useState(0);
  const [countQuestions, setCountQuestions] = useState(0);

  const navigation = useNavigation();

  const quizQuestions = {
    original_title: "Qual é o título original do filme?",
    overview: "Qual é a sinopse deste filme?",
    release_date: "Em que ano o filme foi lançado?",
    runtime: "Qual é a duração do filme em minutos?",
    genres: "Quais são os gêneros do filme?",
    production_companies: "Qual é o nome da empresa produtora do filme?",
    spoken_languages: "Em quais idiomas o filme foi gravado?",
    vote_average: "Qual é a média de votos do filme?",
    vote_count: "Quantas pessoas avaliaram o filme?",
  };

  const array_itens = [
    "original_title",
    "overview",
    "release_date",
    "runtime",
    "genres",
    "production_companies",
    "spoken_languages",
    "vote_average",
    "vote_count",
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const arrayMovies = (lista) => {
    const array_list = [];
    const item = Math.floor(Math.random() * 10);
    const question = array_itens[item];
    for (let i = 1; i < lista.length; i++) {
      const questoes = lista[i][question];
      array_list.push(questoes);
    }
    array_list.splice(item, 1);
    const array = shuffleArray(array_list);
    return { array, question };
  };

  const getMovie = async () => {
    const url = `https://backend-plum-five.vercel.app/api/movies/${id_movie}`;
    const res = await axios.get(url);
    setMoviePrincipal(res.data);
  };

  const getSimilarMovie = async () => {
    const url = `https://backend-plum-five.vercel.app/api/movies/${id_movie}/similar`;
    const res = await axios.get(url);
    setMoviesAlternate((prevMovies) => [...prevMovies, ...res.data.results]);
  };

  const getDetailsMoviesAlternative = async () => {
    for (let idx = 0; idx < moviesAlternate.length; idx++) {
      if (idx < 4) {
        const movie = moviesAlternate[idx];
        const url = `https://backend-plum-five.vercel.app/api/movies/${movie.id}`;
        const res = await axios.get(url);
        if (
          res.data &&
          res.data.id &&
          !moviesAlternateDetails.some(
            (movie) => movie && movie.id === res.data.id
          )
        ) {
          setMoviesAlternateDetails((prevMovies) => [...prevMovies, res.data]);
        }
      }
    }
    setMoviesAlternateDetails((prevMovies) => [...prevMovies, moviePrincipal]);
  };

  const handleNext = () => {
    if (selectedValue === "") return Alert.alert("Atenção", "Selecione uma opção");
    if (
      Object.values(moviePrincipal).some(
        (value) => String(value) === String(selectedValue)
      )
    ) {
      setPontuation(pontuation + 1);
    }
    const item = arrayMovies(moviesAlternateDetails);
    if (item.array.every((value) => value === undefined)) {
      handleNext();
    } else {
      setQuestionsMovies(item);
      setCountQuestions(countQuestions + 1);
    }
    setSelectedValue("");
  };

  useEffect(() => {
    getDetailsMoviesAlternative();
  }, [moviesAlternate]);

  useEffect(() => {
    if (moviesAlternateDetails.length > 4) {
      const item = arrayMovies(moviesAlternateDetails);
      if (item.array.map((value) => value !== undefined)) {
        setQuestionsMovies(item);
      }
    }
  }, [moviesAlternateDetails]);

  useEffect(() => {
    const fetchData = async () => {
      await getMovie();
      await getSimilarMovie();
    };
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {countQuestions === 5 ? (
        <View>
          <Text style={{ fontSize: 18 }}>Pontuação: {pontuation}</Text>
          <Text style={{ fontSize: 18 }}>Total de perguntas: {countQuestions}</Text>
          <Button title="Menu" onPress={() => navigation.navigate("Menu")} />
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 18 }}>
            {questionsMovies && quizQuestions[questionsMovies.question]}
          </Text>
          {questionsMovies &&
            questionsMovies.array.map((subArray, index) => {
              if (Array.isArray(subArray)) {
                const companyNames = subArray
                  .map((valor) => valor.name)
                  .join(", ");
                return (
                  <RadioButton.Item
                    key={index}
                    label={companyNames}
                    value={companyNames}
                    status={selectedValue === companyNames ? "checked" : "unchecked"}
                    onPress={() => setSelectedValue(companyNames)}
                  />
                );
              } else {
                return (
                  <RadioButton.Item
                    key={index}
                    label={subArray}
                    value={subArray}
                    status={selectedValue === subArray ? "checked" : "unchecked"}
                    onPress={() => setSelectedValue(subArray)}
                  />
                );
              }
            })}
          <Button title="Próximo" onPress={handleNext} />
        </View>
      )}
    </View>
  );
}
