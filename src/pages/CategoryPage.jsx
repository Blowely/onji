import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo, Suspense
} from "react";
import { Layout, Button, Modal } from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import { usePrevious } from "../hooks/usePrevios";
import { useOptimizedScroll } from "../hooks/useOptimizedScroll";
import OptimizedCategoryPageWrapper from "./OptimizedCategoryPageWrapper";
import "../index.scss";
import { useAppDispatch, useAppSelector } from "../store";
import {addProducts} from "../common/productsSlice";
import "../components/InitAnimation/InitAnimation.styles.scss";
import { startLoaderAnimation } from "../components/InitAnimation/InitAnimation";
import Product from "./Product";
import {COLOR_LIST} from "./constants";
import {CATEGORIES} from "../components/constants";
import BrandsModalSelector from "../components/BrandsModalSelector/BrandsModalSelector";
import SizesModalSelector from "../components/SizesModalSelector/SizesModalSelector";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import HeroSection from "../components/HeroSection/HeroSection";
import styles from "./CategoryPage.module.scss";
import CatalogControls from "../components/HeroSection/CatalogControls/CatalogControls";
import leftArrow from "../assets/svg/v2/left-arrow.svg";
import searchSvg from '../assets/svg/v2/search.svg';
import Filters from "../components/Filters";
import SearchOverlay from "../components/SearchOverlay/SearchOverlay";
import {useGetProductsQuery} from "../store/products.store";


function CategoryPage({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSlice = useAppSelector((state) => state.products);

  const sizesParam = searchParams.get("sizes");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const colorsParam = searchParams.get("colors");
  const category1IdParam = searchParams.get("category1Id");
  const category2IdParam = searchParams.get("category2Id");
  const category3IdParam = searchParams.get("category3Id");
  const brandsParam = searchParams.get("brandIds");
  const categoryName = searchParams.get("categoryName");


  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');
  const [sizes, setSizes] = useState(!!sizesParam ? sizesParam?.split(',') : []);
  const [selectedBrands, setSelectedBrands] = useState(!!brandsParam ? brandsParam?.split(',') : []);
  const [colors, setColors] = useState(!!colorsParam ? colorsParam?.split(',') : []);
  const [isOpenBrandsModal, setOpenBrandsModal] = useState(false);
  const [isOpenSizesModal, setOpenSizesModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const prevYRef = useRef(0);
  
  // Стили для виртуального списка
  const listStyles = {
    height: 'calc(100vh - 200px)',
    width: '100%',
    margin: '0 auto',
    padding: '0 10px',
    boxSizing: 'border-box',
  };
  
  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    fontSize: '16px',
    color: '#666',
  };

  const search = searchParams.get("search");
  const collection = searchParams.get("collName") || "";
  const type = searchParams.get("type");
  const url = searchParams.get("url");
  const spuId = searchParams.get("spuId");
  const sortBy = searchParams.get("sortBy");
  const category1Id = searchParams.get("category1Id");
  const category2Id = searchParams.get("category2Id");
  const category3Id = searchParams.get("category3Id");

  const selectedCategory = category1Id || category2Id || category3Id;

  const [sort, setSort] = useState(sortBy || 'by-relevance');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [recent, setRecent] = useState(['adidas ozweego', 'джорданы', 'худи', 'рубашка']);

  const filtersRef = useRef(null);
  const headerRef = useRef(null);

  const gender = localStorage.getItem("gender") || "men";

  const isDesktopScreen = window?.innerWidth > 768;

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = useCallback((page = 1) => {
    const genderToFit = {
      'women': ['FEMALE'],
      'men': ['MALE'],
    }

    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
      fit: genderToFit[gender],
      sort: sortBy || 'by-relevance',
      page
    };

    if (brandsParam) {
      obj.brandIds = brandsParam;
    }

    if (collection) {
      obj.collName = collection;
    }

    if (minPriceParam) {
      obj.minPrice = minPriceParam;
    }

    if (maxPriceParam) {
      obj.maxPrice = maxPriceParam;
    }


    if (sizesParam) {
      obj.sizes = sizesParam;
    }


    if (colorsParam) {
      obj.colors = colorsParam;
    }

    if (category3IdParam) {
      obj.category3Id = category3IdParam;
    }

    if (category2IdParam) {
      obj.category2Id = category2IdParam;
    }
    if (category1IdParam) {
      obj.category1Id = category1IdParam;
    }

    return obj;
  }, [brandsParam, category1IdParam, category2IdParam, category3IdParam, 
      collection, colorsParam, gender, maxPriceParam, minPriceParam, search, sizesParam, sortBy]);

  const {
    data: products = { items: [], totalCount: 0 },
    isFetching: isLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery(buildRequest(1));

  const loadMoreItems = useCallback(async (startIndex, endIndex) => {
    if (!hasMore || isLoading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const nextPage = Math.floor(startIndex / 20) + 1;
      if (nextPage <= offset) return; // Уже загружено
      
      const result = await refetchProducts(buildRequest(nextPage));
      
      if (result.error) {
        throw new Error('Ошибка при загрузке товаров');
      }
      
      setOffset(nextPage);
      
      // Проверяем, есть ли еще данные для загрузки
      if (result.data?.items?.length < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Ошибка при загрузке товаров:', err);
      setError('Не удалось загрузить товары. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  }, [buildRequest, hasMore, isLoading, offset, refetchProducts]);

  const searchOrCollection = `${category3IdParam}+${category2IdParam}+${category1IdParam}+${search}+${sizesParam}`+
    `+${minPriceParam}+${maxPriceParam}+${sortBy}+${colorsParam}+${brandsParam}+${gender}` || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection?.replace(/ /g, "");

  useEffect(() => {
    setLoading(false);

    if (productsSlice[trimCollectionValue]?.length) {
      if (prevCollectionValue !== searchOrCollection) {
        dispatch(
            addProducts({
              [trimCollectionValue]: products?.items || [],
            }),
        );
      } else {
        dispatch(
            addProducts({
              [trimCollectionValue]: [
                ...productsSlice[trimCollectionValue],
                ...products?.items || [],
              ],
            }),
        );
      }
    } else if (products?.items?.length) {
      try {
        dispatch(
            addProducts({
              [trimCollectionValue]: products?.items || [],
            }),
        );
      } catch (e) {
        console.log("e =", e);
      }
    }
  }, [products]);

  const onCardClickHandler = useCallback((item) => {
  setSelectedProduct(item);
  const spuId = item?.spuId || '';
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('spuId', spuId);
  setSearchParams(newSearchParams);
  localStorage.setItem('product', JSON.stringify(item));
}, [searchParams, setSearchParams]);

  let startY = 0;
  let isScrolling = false;

  const onPointerDown = useCallback((event) => {
  startY = event.touches ? event.touches[0].clientY : event.clientY;
  isScrolling = false;
}, []);

  const onPointerMove = useCallback(() => {
  isScrolling = true;
}, []);

  const onPointerUp = useCallback((item, event) => {
  const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
  const diff = Math.abs(startY - endY);

  if (!isScrolling && diff < 5) {
    onCardClickHandler(item);
  }
}, [onCardClickHandler]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Optimized scroll handling
  const handleScroll = useCallback(() => {
    if (overlayVisible) {
      setIsScrolled(true);
      return;
    }

    const y = window.scrollY;
    const show = y > 10;

    if (!spuId) {
      setIsScrolled(show);
    }

    const slider = document.getElementsByClassName('beeon-slider');
    const sliderHeight = slider[0]?.clientHeight || 0;

    if (y < prevYRef.current && y > sliderHeight && !isDesktopScreen) {
      setShowControls(true);
    } else if (y <= sliderHeight || y >= prevYRef.current) {
      setShowControls(false);
    }
    
    prevYRef.current = y;
  }, [spuId, overlayVisible, isDesktopScreen]);

  // Use optimized scroll hook
  useOptimizedScroll(handleScroll);

  const MemoizedCard = memo(({ item, index, onAddToFavorite, onAddToCart, onPointerDown, onPointerUp, isLoading }) => {
  const image = item?.images?.[0] || '';
  const title = item?.name || '';
  const price = item?.price || '';

  return (
    <div key={`${item?.spuId}-${index}`} style={{height:'100%'}}>
      <Card
        onFavorite={onAddToFavorite}
        onPlus={onAddToCart}
        loading={isLoading}
        image={image}
        price={price}
        item={item}
        name={title}
        index={index + 1}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      />
    </div>
  );
});

const productsItems = useMemo(() => {
    return productsSlice[trimCollectionValue] || [];
  }, [productsSlice, trimCollectionValue]);

  const renderItems = () => (
    <OptimizedCategoryPageWrapper 
      onAddToFavorite={onAddToFavorite}
      onAddToCart={onAddToCart}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      isLoading={isLoading}
      loading={loading}
      trimCollectionValue={trimCollectionValue}
    />
  );

  const docElements = document.getElementsByClassName("cards-section-wrapper");

  let currentPage = true;

  useEffect(() => {
    currentPage = false;
  }, [products]);


  window.addEventListener(
      "scroll",
      function (event) {
        try {
          const lastEl =
              docElements[0]?.children[docElements[0]?.children?.length - 1]
                  ?.offsetTop - 3500;
          const windowPageYOffset = window.pageYOffset;


          if (windowPageYOffset >= lastEl && !isLoading && !currentPage) {
            currentPage = true;

            if (products.items.length === limit) {
              setOffset((prev) => {
                /*if ((productsSlice?.[trimCollectionValue]?.length || 1) + 1 === prev + 1) {
                  return prev + 1;
                }*/
              console.log('prev=',prev)
              return prev + 1;
            })
          }
        }
      } catch (e) {
        console.log("e =", e);
      }
    },
    false,
  );

  const onBrandClick = (brand) => {
    if (brand.toString() === brandsParam) {
      searchParams.delete('brandIds');
      return setSearchParams(searchParams);
    }

    setSelectedBrands((prev) => [...prev, Number(brand)]);
    setLoading(true);
    setOffset(1);
    searchParams.set('brandIds', brand);
    setSearchParams(searchParams);
  }

  const onMinPriceChange = (val) => {
    setMinPrice(val);
  }

  const onMaxPriceChange = (val) => {
    setMaxPrice(val);
  }

  const applyFilters = () => {
    window.scrollTo(0, 0);
    setLoading(true);
    setOffset(1);
    setShowFilters(false);

    const params = {
      sizes: sizes.join(',') || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      colors: colors
          ?.map((c1) => COLOR_LIST.find((c2) => c2.hex === c1)?.hex)
          .filter(Boolean)
          .join(',') || null,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);
  };


  const isEnabledFilters = !!(minPriceParam || maxPriceParam || sizesParam);

  const body = document.body;

  if (showFilters || url) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }

  const getBorderStyle = (selectedBrandId) => {
    if (brandsParam === selectedBrandId.toString()) {
      return {border: "1px solid grey"};
    } else {
      return {border: "1px solid white"};
    }
  }

  const handleChange = (value) => {
    setLoading(true);
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
    setSort(value);
    setOffset(1);
  };

  const getCategoryTitle = () => {
    if (!selectedCategory) {
      return '';
    }

    const index = CATEGORIES.findIndex((el) => el.id === Number(selectedCategory));

    return <span style={{cursor: "pointer"}}>{CATEGORIES[index]?.name
      || categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      || ''}</span> ;
  }

  const onGoBackClick = () => {
    return window.history.go(-1);
  }

  const onApplyBrandsClick = () => {
    if (!selectedBrands.length) {
      return;
    }

    setLoading(true);
    setOffset(1);
    searchParams.set('brandIds', selectedBrands.join(','));
    setSearchParams(searchParams);
    setOpenBrandsModal(false);
  }

  const onApplySizesClick = () => {
    setLoading(true);
    setOffset(1);

    if (!sizes.length) {
      searchParams.delete('sizes');
    } else {
      searchParams.set('sizes', sizes.join(','));
    }
    setSearchParams(searchParams);
    setOpenSizesModal(false);
  }

  const onCancelBrandsClick = () => {
    setOffset(1);
    setSelectedBrands([]);
    searchParams.delete('brandIds');
    setSearchParams(searchParams);
    setOpenBrandsModal(false);
  }

  const onCancelSizesClick = () => {
    setOffset(1);
    setSizes([]);
    searchParams.delete('sizes');
    setSearchParams(searchParams);
    setOpenSizesModal(false);
  }

  const scrollButton = document.getElementById('scrollToTop');

  window?.addEventListener('scroll', () => {
    if (window?.scrollY > 200) {
      scrollButton?.classList?.add('show');
    } else {
      scrollButton?.classList?.remove('show');
    }
  });

  scrollButton?.addEventListener('click', () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const onInfoBlockItemClick = (link) => {
    window.open(link);
  }

  const onSearch = (value) => {
    if (!value) {
      return;
    }

    window.scrollTo({top: 0})
    setSearchParams(new URLSearchParams({ search: typeof value === "string" ? value : '' }));
    setOffset(1);
  }

  const onSelectHandler = (value) => {
    onSearch(value);
  }

  const onSearchClick = () => {
    setOverlayVisible(true);
  }

  const isWebView = navigator.userAgent.includes('OnjiApp');
  console.log('isScrolled', isScrolled)
  return (
      <Layout style={{
        backgroundColor: "white",
        position: "relative",
        paddingBottom: !isDesktopScreen ? "200px" : 'unset'
      }}>
        {spuId && <div className="productWrapper" id="productWrapper">
          <Product selectedProduct={selectedProduct} setLoading={setLoading} setOffset={setOffset} />
        </div>
        }
        {isOpenBrandsModal && (
            <Modal
                title="Бренды"
                open={isOpenBrandsModal}
                onOk={onApplyBrandsClick}
                cancelButtonProps={(<Button>Сбросить</Button>)}
                cancelText={<Button onClick={onCancelBrandsClick}>Сбросить</Button>}
                okText="Применить"
                centered={!isDesktopScreen}
                onCancel={(e) => {
                  setOpenBrandsModal(false);
                }}
                className="custom-modal"
            >
              <div
                  style={{
                    display: "grid",
                    padding: "15px",
                    borderBottom: "1px solid #ececec",
                    gap: "15px",
                  }}
              >
                <div style={{fontSize: "22px", fontWeight: "500"}}>
                  Бренды
                </div>
                <BrandsModalSelector brands={selectedBrands} setBrands={setSelectedBrands}/>
              </div>
            </Modal>
        )}
        {isOpenSizesModal && (
            <Modal
                title="Размеры, EU"
                open={isOpenSizesModal}
                onOk={onApplySizesClick}
                cancelButtonProps={(<Button>Сбросить</Button>)}
                cancelText={<Button onClick={onCancelSizesClick}>Сбросить</Button>}
                okText="Применить"
                centered={!isDesktopScreen}
                onCancel={(e) => {
                  setOpenSizesModal(false);
                }}
                className="custom-modal"
            >
              <div
                  style={{
                    display: "grid",
                    padding: "15px",
                    borderBottom: "1px solid #ececec",
                    gap: "15px",
                  }}
              >
                <div style={{fontSize: "22px", fontWeight: "500"}}>
                  Размеры, EU
                </div>
                <SizesModalSelector sizes={sizes} setSizes={setSizes}/>
              </div>
            </Modal>
        )}
        {showFilters &&
          <div className={styles.filtersPhoneWrapper} ref={filtersRef}>
              <Filters
                  setShowFilters={setShowFilters}
                  sizes={sizes}
                  colors={colors}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  setSizes={setSizes}
                  setMinPrice={onMinPriceChange}
                  setMaxPrice={onMaxPriceChange}
                  setLoading={setLoading}
                  setOffset={setOffset}
                  setColors={setColors}
              />
              {!isDesktopScreen &&
                  <div className={styles.filtersPhoneApplyBtn}>
                    <Button
                        type="primary"
                        className={"btn"}
                        onClick={applyFilters}
                    >
                      <span>применить</span>
                    </Button>
                  </div>
              }
          </div>
        }
        {!isDesktopScreen &&
            <div
                className={`overlayWrapper ${overlayVisible ?'overlayVisible':''}`}
                style={{opacity: overlayVisible ? 1 : 0}}
            >
              <SearchOverlay
                  visible={overlayVisible}
                  showInput={overlayVisible}
                  onClose={() => setOverlayVisible(false)}
                  setOverlayVisible={setOverlayVisible}
                  recentSearches={recent}
                  onSelect={onSelectHandler}
              />
            </div>
        }

        <HeroSection/>

        {!isDesktopScreen && (
            <div
                className={`${styles.contentBlockHeader} ${isScrolled ? styles.scrolledHeader : ''}`}
                style={{
                  opacity: isScrolled || overlayVisible ? 1 : 0,
                  touchAction: (!isScrolled && !overlayVisible) ? 'none' : 'auto',
                  display: search || overlayVisible ? 'flex' : 'grid',
                  pointerEvents: overlayVisible ? 'none' : 'auto'
                }}
                ref={headerRef}
            >
              {search && (
                  <span style={{display: "flex", gap: "10px", alignItems: "center", flex: 1, minWidth: 0}}>
                    <img src={leftArrow} onClick={onGoBackClick} alt="backButton" style={{flexShrink: 0}}/>
                    <span style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                      minWidth: 0,
                    }}>
                      {search}
                    </span>
                  </span>
              )}

              {selectedCategory && <img src={leftArrow} onClick={onGoBackClick} alt='backButton'/>}
              {selectedCategory && <span style={{display: selectedCategory ? 'block' : 'none'}}>{getCategoryTitle()}</span>}

              <img src={searchSvg} style={{height: '22px'}} onClick={onSearchClick} alt='backButton'/>
            </div>
        )}

        <div className={`
         ${styles.categoryTableWrapper}
         ${showControls ? styles.controlsVisible : styles.controlsHidden}
        `}
         style={{
           transform: showControls && isWebView && 'translateY(calc(100% + 62px))',
         }}
        >
          <CatalogControls setShowFilters={setShowFilters}/>
        </div>

        <div className={styles.productsWrapper}>
          <Suspense fallback={<div>Loading...</div>}>{renderItems()}</Suspense>
        </div>

        {!isDesktopScreen &&
            <PhoneFooter tab="categories"/>
        }
      </Layout>
  );
}

export default CategoryPage;
