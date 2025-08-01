import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from './data/productData.js';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id)) || products[0];

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <div className="main-section">
                    <div className="main-left">
                        <img
                            src="/assets/market1.png"
                            alt="Product"
                            className="product-detail-image"
                        />
                    </div>
                    <div className="main-right">
                        <h1 className="product-detail-title">{product.name}</h1>
                        <div className="product-detail-line"></div>
                        <p className="product-detail-description">
                            Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.
                        </p>
                        <div className="product-detail-scroll">
                            <span>scroll down</span>
                            <img
                                src="/assets/arrowDown.png"
                                alt="Arrow down"
                                className="scroll-arrow"
                            />
                        </div>
                    </div>
                </div>
                <div className="first-section">
                    <div className="first-left">
                        <div className="content-container">
                            <div className="page-number-01">01</div>
                            <div className="tagline-container" data-name="Tagline">
                                <div className="tagline-line" data-name="Line"></div>
                            </div>
                            <div className="content-title">
                                <p className="block leading-[normal]">Satış və Kassa İdarəetməsi</p>
                            </div>
                            <div className="content-description-01">
                                <p className="block leading-[1.2]">
                                    Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal
                                    qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə,
                                    tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə
                                    görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış
                                    faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası
                                    izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi
                                    təmin olunur.
                                </p>
                            </div>
                            <div className="more-container" data-name="More">
                                <div className="more-text">
                                    <p className="block mb-0">
                                        Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq,
                                        nağd və bank hesabları arası köçürmələri izləmək, qaytarma və ləğv
                                        əməliyyatlarını hesabatlarda göstərmək mümkündür.
                                    </p>
                                    <p className="block mb-0">&nbsp;</p>
                                    <p className="block">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="first-right">
                        <img
                            src="/assets/market2.png"
                            alt="Market 2"
                            className="product-detail-image"
                        />
                    </div>
                </div>
                <div className="second-section">
                    <div className="second-left">
                        <img
                            src="/assets/market3.png"
                            alt="Market 3"
                            className="product-detail-image"
                        />
                    </div>
                    <div className="second-right">
                        <div className="content-container">
                            <div className="page-number-02">02</div>
                            <div className="tagline-container" data-name="Tagline">
                                <div className="tagline-line" data-name="Line"></div>
                            </div>
                            <div className="content-heading">
                                <p className="block leading-[normal]">Müştəri və CRM İdarəetməsi</p>
                            </div>
                            <div className="content-description-02">
                                <p className="block leading-[1.2]">
                                    Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər.
                                    Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz
                                    etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və
                                    endirim kartları təyin olunur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="third-section">
                    <div className="third-left">
                        <div className="content-container">
                            <div className="page-number-03">03</div>
                            <div className="tagline-container" data-name="Tagline">
                                <div className="tagline-line" data-name="Line" />
                            </div>
                            <div className="main-title">
                                <p>Təchizat və Anbar İdarəetməsi</p>
                            </div>
                            <div className="more-container" data-name="More">
                                <div className="more-text">
                                    <p>
                                        Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi
                                        və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə
                                        və hesablaşmalar təqib olunur.
                                    </p>
                                </div>
                            </div>
                            <div className="description-text">
                                <p>
                                    Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və
                                    transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir,
                                    avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və
                                    maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası
                                    ilə mal itkisinə nəzarət mümkündür.
                                </p>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                    <div className="third-right">
                        {/* Right side content can be added here later */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
