import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Suspense
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
import { useInView } from 'react-intersection-observer';

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
  const [showControls, setShowControls] = useState(false);
  const prevYRef = useRef(0);

  const search = searchParams.get("search");
  const collection = searchParams.get("collName") || "";
  const url = searchParams.get("url");
  const spuId = searchParams.get("spuId");
  const sortBy = searchParams.get("sortBy");
  const category1Id = searchParams.get("category1Id");
  const category2Id = searchParams.get("category2Id");
  const category3Id = searchParams.get("category3Id");

  const selectedCategory = category1Id || category2Id || category3Id;

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [recent, setRecent] = useState(['adidas ozweego', 'джорданы', 'худи', 'рубашка']);

  const filtersRef = useRef(null);

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

    const limit = 20; // Items per page

    let obj = {
      limit: limit,
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

  const [page, setPage] = useState(1);
  const {
    data: products = { items: [], totalCount: 0 },
    isFetching: isLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery(buildRequest(page));

  // Track current page to prevent multiple loads
  const currentPage = useRef(false);
  const wrapperRef = useRef(null);

  const searchOrCollection = `${category3IdParam}+${category2IdParam}+${category1IdParam}+${search}+${sizesParam}`+
      `+${minPriceParam}+${maxPriceParam}+${sortBy}+${colorsParam}+${brandsParam}+${gender}` || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection?.replace(/ /g, "");

  // Set up scroll event listener for infinite loading
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout
      timeoutId = setTimeout(() => {
        try {
          if (!wrapperRef.current || isLoading || currentPage.current) return;

          const wrapper = wrapperRef.current;
          const wrapperHeight = wrapper.scrollHeight;
          const triggerPoint = wrapperHeight * 0.7; // Load more when scrolled 50% down
          const windowPageYOffset = window.pageYOffset + window.innerHeight;

          // Trigger when scrolled past the halfway point
          if (windowPageYOffset >= triggerPoint && products?.items?.length === 20) {
            currentPage.current = true;
            setPage(prev => {
              const nextPage = prev + 1;
              console.log('Loading more items, next page:', nextPage);
              return nextPage;
            });
          }
        } catch (e) {
          console.error('Scroll error:', e);
        }
      }, 50); // 300ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, products?.items?.length]);

  // Reset currentPage and page when search or filters change
  useEffect(() => {
    if (products?.items?.length) {
      currentPage.current = false;
    }
  }, [products, searchOrCollection]);

  // Reset to first page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [searchOrCollection]);

  // Load more items function

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
    console.log('item=',item)
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
    onCardClickHandler(item);
  }, [onCardClickHandler]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  const wasProductOpen = useRef(false);

  useEffect(() => {
    if (spuId) {
      // When opening the product
      wasProductOpen.current = true;

      // Save current scroll position
      const scrollY = window.scrollY;

      // Show and animate product in
      if (productRef.current) {
        productRef.current.style.display = 'block';
        void productRef.current.offsetHeight; // Trigger reflow
        setIsProductVisible(true);
        setIsAnimating(true);

        // End animation after it completes
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 300);

        // Store scroll position
        sessionStorage.setItem('productOpenScrollPos', scrollY);

        return () => clearTimeout(timer);
      }

      document.body.style.overflow = 'hidden';

    } else if (wasProductOpen.current) {
      // When closing the product
      wasProductOpen.current = false;
      setIsProductVisible(false);

      // Restore scroll position after a small delay.
      const timer = setTimeout(() => {
        // Hide the product
        if (productRef.current) {
          productRef.current.style.display = 'none';
        }

        // Restore scroll position if it was saved
        const savedScroll = sessionStorage.getItem('productOpenScrollPos');
        if (savedScroll) {
          window.scrollTo(0, parseInt(savedScroll));
          sessionStorage.removeItem('productOpenScrollPos');
        }

        // Force update header state
        const header = document.querySelector(`.${styles.contentBlockHeader}`);
        if (header) {
          const shouldShow = window.scrollY > 10;
          header.style.opacity = shouldShow ? '1' : '0';
          header.style.pointerEvents = shouldShow ? 'auto' : 'none';
        }

        // Force a small scroll to ensure pointer events work
        setTimeout(() => {
          window.scrollBy(0, 1);
          setTimeout(() => window.scrollBy(0, -1), 10);
        }, 50);

      }, 50);

      document.body.style.overflow = 'auto';
      return () => clearTimeout(timer);
    }
  }, [spuId]);

  const isWebView = navigator.userAgent.includes('OnjiApp');

  const renderItems = () => (
      <div ref={wrapperRef}>
        <OptimizedCategoryPageWrapper
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            isLoading={isLoading}
            loading={loading}
            trimCollectionValue={trimCollectionValue}
        />
      </div>
  );

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

  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const productRef = useRef(null);

  const handleMainScroll = useCallback(() => {
    if (overlayVisible) return;

    const slider = document.getElementsByClassName('beeon-slider');
    const sliderHeight = slider[0]?.clientHeight || 0;
    const y = window.scrollY;

    if (y < prevYRef.current && y > sliderHeight && !isDesktopScreen) {
      setShowControls(true);
    } else if (y <= sliderHeight || y >= prevYRef.current) {
      setShowControls(false);
    }

    prevYRef.current = y;
  }, [overlayVisible, isDesktopScreen]);

  useOptimizedScroll(handleMainScroll);

  // Handle body overflow when product is open
  useEffect(() => {
    if (spuId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [spuId]);

  const [headerRef, headerInView] = useInView({
    threshold: 0,
    initialInView: false,
    triggerOnce: false,
    rootMargin: '1px 0px 0px 0px',
  });

  const [sentinelRef, sentinelInView] = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    const header = document.getElementById("headerEl");
    if (!header) return;

    const updateHeaderVisibility = () => {
      const shouldHide = !(window.scrollY > 10 || overlayVisible || search);

      if (shouldHide) {
        header.classList.add(styles.hidden);
      } else {
        header.classList.remove(styles.hidden);
      }
    };

    // Initial update
    updateHeaderVisibility();

    // Add scroll listener
    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateHeaderVisibility);
      if (header) {
        header.classList.remove(styles.hidden);
      }
    };
  }, [overlayVisible, search]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(`.${styles.contentBlockHeader}`);
      if (header && !spuId) { // Only update header if not in product view
        const shouldShow = window.scrollY > 10;

        if (shouldShow) {
          header.classList.remove(styles.hidden);
        } else {
          header.classList.add(styles.hidden);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with passive true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [spuId]);

  return (
      <Layout style={{
        backgroundColor: "white",
        position: "relative",
        paddingBottom: !isDesktopScreen ? "200px" : 'unset'
      }}>
        <div
            ref={productRef}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'white',
              zIndex: 1000,
              overflowY: 'auto',
              paddingTop: isWebView ? '60px' : 0,
              transform: isProductVisible ? 'translateX(0)' : 'translateX(100%)',
              transition: isAnimating ? 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
              display: 'none' // Initially hidden
            }}
        >
          {spuId && (
              <Product selectedProduct={selectedProduct} setLoading={setLoading} setOffset={setOffset} />
          )}
        </div>
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
            <div
                style={{paddingTop: isWebView && '60px' }}
                className={styles.filtersPhoneWrapper}
                ref={filtersRef}
            >
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
                className={`overlayWrapper animated ${overlayVisible ?'overlayVisible overlayVisibleAnimated':''}`}
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

        <div ref={sentinelRef} style={{ position: 'absolute', top: '1px', width: '1px', height: '1px' }} />

        <div
            ref={headerRef}
            className={`${styles.contentBlockHeader} ${search ? styles.searchActive : ''}`}
            style={{
              display: search ? 'flex' : 'grid',
              marginTop: !isWebView && '-60px',
            }}
            id="headerEl"
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
          <img src={searchSvg} style={{height: '22px'}} onClick={onSearchClick} alt='searchButton'/>
        </div>

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
