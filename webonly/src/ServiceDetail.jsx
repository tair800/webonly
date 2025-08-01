import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesList } from './data/servicesData.js';
import './ServiceDetail.css';

function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const services = servicesList;
    const currentService = services.find(s => s.id === parseInt(id)) || services[0];



    function Icon({ isActive }) {
        return (
            <div className="icon-container" data-name="Icon">
                <img
                    height="41"
                    src={isActive ? "/assets/services-active.png" : "/assets/services-deac.png"}
                    width="41"
                    alt="Icon"
                />
            </div>
        );
    }

    function Background({ isActive }) {
        return (
            <div className="background" data-name="Background">
                <div className="background-inner">
                    <div className="icon-flip">
                        <Icon isActive={isActive} />
                    </div>
                </div>
            </div>
        );
    }

    function Link({ service, isActive }) {
        return (
            <div className="link-container" data-name="Link" onClick={() => navigate(`/services/${service.id}`)}>
                <div className="link-text">
                    <p className="adjustLetterSpacing">
                        {service.subtitle}
                    </p>
                </div>
                <Background isActive={isActive} />
                <div className="side-indicator" data-name="Background" />
            </div>
        );
    }

    function Item({ service, isActive }) {
        return (
            <div className="item-container" data-name="Item">
                <div aria-hidden="true" className="item-border" />
                <Link service={service} isActive={isActive} />
            </div>
        );
    }

    function Icon1({ isActive }) {
        return (
            <div className="icon-container-small" data-name="Icon">
                <img
                    height="36"
                    src={isActive ? "/assets/services-active.png" : "/assets/services-deac.png"}
                    width="36"
                    alt="Icon"
                />
            </div>
        );
    }

    function Link1({ service, isActive }) {
        return (
            <div className="link-container-inactive" data-name="Link" onClick={() => navigate(`/services/${service.id}`)}>
                <div className="link-text-inactive">
                    <p className="adjustLetterSpacing">
                        {service.subtitle}
                    </p>
                </div>
                <div className="icon-wrapper">
                    <div className="icon-flip">
                        <Icon1 isActive={isActive} />
                    </div>
                </div>
                <div className="side-indicator-white" data-name="Background" />
            </div>
        );
    }

    function Item1({ service, isActive }) {
        return (
            <div className="item-container item-inactive" data-name="Item">
                <div aria-hidden="true" className="item-border" />
                <Link1 service={service} isActive={isActive} />
            </div>
        );
    }

    function List() {
        return (
            <div className="list-container" data-name="List">
                {services.map((service) => {
                    const isActive = service.id === parseInt(id);

                    if (isActive) {
                        return <Item key={service.id} service={service} isActive={isActive} />;
                    } else {
                        return <Item1 key={service.id} service={service} isActive={isActive} />;
                    }
                })}
            </div>
        );
    }

    function Aside() {
        return (
            <div className="aside-container" data-name="Aside">
                <List />
            </div>
        );
    }

    // Loglama Article Components
    function HorizontalBorder({ number }) {
        return (
            <div className="horizontal-border-container" data-name="HorizontalBorder">
                <div aria-hidden="true" className="horizontal-border-line" />
                <div className="horizontal-border-number">
                    <p>{number}</p>
                </div>
                <div className="horizontal-border-dot" data-name="Background" />
            </div>
        );
    }

    function Article({ number, title, description }) {
        return (
            <div className="article-container" data-name="Article">
                <div className="article-title">
                    <p>{title}</p>
                </div>
                <div className="article-description">
                    <p>{description}</p>
                </div>
                <HorizontalBorder number={number} />
            </div>
        );
    }

    function ArticleRow({ articles }) {
        return (
            <div className="article-row">
                {articles.map((article, index) => (
                    <Article
                        key={index}
                        number={article.number}
                        title={article.title}
                        description={article.description}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="service-detail-container">
            <div className="service-detail-content">
                <div className="service-detail-left">
                    <h3 className="service-detail-sidebar-title">Xidmətlərimiz</h3>
                    <div className="list-container">
                        <Aside />
                    </div>
                </div>
                <div className="service-detail-right">
                    <div className="service-detail-content-area">
                        <img
                            src={currentService.detailImage}
                            alt={currentService.name}
                            className="service-detail-image"
                        />
                    </div>
                    <h1 className="service-detail-title">{currentService.name}</h1>
                    {currentService.description && (
                        <p className="service-detail-description">{currentService.description}</p>
                    )}

                    {/* Dynamic Article Section */}
                    {currentService.articles && (
                        <div className="loglama-article-section">
                            <ArticleRow articles={currentService.articles} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail; 