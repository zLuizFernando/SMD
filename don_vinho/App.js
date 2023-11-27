import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import Modal from 'react-native-modal';

// Componente de Cabeçalho
const Header = ({ toggleModal, toggleSearch, navigateToHome }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo do aplicativo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Don'Vinhos</Text>
      </View>

      {/* Ícones do usuário, carrinho, pesquisa e menu */}
      <View style={styles.iconContainer}>
        <AntDesign name="user" size={30} color="black" style={styles.icon} />
        <AntDesign
          name="shoppingcart"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TouchableOpacity onPress={toggleSearch}>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WineStoreApp = () => {
  // Dados dos vinhos
  const wines = [
    {
      image: require('./assets/ImagemMaisVendidos.jpg'),
      width: 420,
      height: 180,
    },
  ];

  // Estados do componente
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Novos estados para a animação
  const menuAnimation = useSharedValue(0); // Valor inicial
  const menuSpeed = 5; // Velocidade da animação

  // Função para navegar para a tela principal
  const navigateToHome = () => {
    console.log('Navegar para a tela principal');
  };

  // Função para abrir/fechar o modal
 const toggleModal = () => {
  setModalVisible(!isModalVisible);

  // Atualiza a animação do menu
  menuAnimation.value = withSpring(isModalVisible ? 0 : 1, { velocity: menuSpeed });
};

  // Função para mostrar/ocultar a barra de pesquisa
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setSearchResults([]); // Limpa os resultados quando o campo de pesquisa é aberto
  };

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    const results = wines.filter((wine) =>
      wine.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);

    if (results.length > 0) {
      setSearchVisible(false);
    }
  };

  // Categorias disponíveis
  const categories = [
    'Vinho Branco',
    'Vinho Tinto',
    'Vinho Seco',
    'Vinho Suave',
    'Mais Vendidos',
    'Dicas de Acompanhamento'
  ];

  

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <Header
        toggleModal={toggleModal}
        toggleSearch={toggleSearch}
        navigateToHome={navigateToHome}
      />

      {/* Título da seção de vinhos mais vendidos */}
      <Text style={styles.sectionTitle}>Mais vendidos:</Text>

      {/* Lista de vinhos */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {searchResults.length > 0
          ? // Mostra os resultados da pesquisa
            searchResults.map((item, index) => (
              <View key={index} style={styles.wineContainer}>
                <Image source={item.image} style={styles.wineImage} />
              </View>
            ))
          : // Mostra todos os vinhos se não houver pesquisa ativa
            wines.map((item, index) => (
              <View key={index} style={styles.wineContainer}>
                <Image source={item.image} style={styles.wineImage} />

                {/* Texto abaixo da imagem (pode ser personalizado conforme necessário) */}
                <Text style={styles.wineText}>Categorias Don'Vinhos</Text>

                {/* Imagem adicional abaixo do texto "Categorias Don'Vinhos" */}
                <Image
                  source={require('./assets/ImagemCategoriasVinhos.jpg')}
                  style={styles.categoryImage}
                />

                {/* Texto "Dicas de Acompanhamento" */}
                <Text style={styles.accompanimentText}>
                  Dicas de Acompanhamento
                </Text>
              </View>
            ))}

        {/* Adiciona três imagens lado a lado */}
        <View style={styles.rowContainer}>
          <Image
            source={require('./assets/acompanhamento1.jpg')}
            style={styles.additionalImage}
          />
          <Image
            source={require('./assets/acompanhamento2.jpg')}
            style={styles.additionalImage}
          />
          <Image
            source={require('./assets/acompanhamento3.jpg')}
            style={styles.additionalImage}
          />
        </View>
      </ScrollView>

      {/* Modal de categorias */}
      <Modal isVisible={isModalVisible}>
        <ImageBackground
          source={require('./assets/ImagemDeFundoMenu.jpg')}
          style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Categorias</Text>
          {categories.map((category, index) => (
            <Text key={index} style={styles.modalCategory}>
              {category}
            </Text>
          ))}
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>

      {isSearchVisible && searchResults.length === 0 && (
        <View style={styles.searchOverlay}>
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            onChangeText={(text) => setSearchText(text)}
          />
          <Text style={styles.searchPlaceholder}>Digite o que procura...</Text>
          <View style={styles.searchButtonsContainer}>
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Procurar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleSearch}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = {
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(200, 0, 0, 1.0)',
    height: '12%',
  },
  logoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 25,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    color: 'rgba(0, 0, 0, 1.0)',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wineContainer: {
    margin: 10,
    alignItems: 'center',
  },
  wineImage: {
    width: 420,
    height: 180,
    borderRadius: 0,
  },
  wineText: {
    position: 'absolute',
    top: 190,
    left: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  categoryImage: {
    width: 420,
    height: 140,
    marginTop: 60,
  },
  accompanimentText: {
    position: 'absolute',
    top: 390,
    left: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1.0,
    borderRadius: 20, // Adiciona borda arredondada
    overflow: 'hidden', // Garante que a borda arredondada seja exibida corretamente
  },
  modalTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 100,
    color: 'white',
  },
  modalCategory: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 50,
  },
  modalCloseButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
  },
  searchPlaceholder: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  searchButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  searchButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Ajusta o espaçamento uniforme
    padding: 10, // Adiciona padding ao redor das imagens
  },
  additionalImage: {
    width: 190,
    height: 220,
    borderRadius: 0,
    margin: 25, // Adiciona margem ao redor das imagens
    resizeMode: 'cover', // Ajusta a estratégia de redimensionamento
    borderWidth: 0, // Adiciona uma borda
    borderColor: 'black', // Cor da borda
    shadowColor: 'black', // Cor da sombra
    shadowOffset: { width: 2, height: 2 }, // Offset da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 0, // Raio da sombra
  },
};

export default WineStoreApp
