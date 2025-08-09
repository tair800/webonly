SET XACT_ABORT ON;
BEGIN TRAN;

-- Azerbaijani letters via NCHAR to guarantee correctness
DECLARE @SCHWA NVARCHAR(1)=NCHAR(601), @CAP_SCHWA NVARCHAR(1)=NCHAR(399),
        @DOTLESSI NVARCHAR(1)=NCHAR(305), @CAP_I_DOT NVARCHAR(1)=NCHAR(304),
        @SCEDILLA NVARCHAR(1)=NCHAR(351), @CCEDILLA NVARCHAR(1)=NCHAR(231),
        @OUML NVARCHAR(1)=NCHAR(246), @UUML NVARCHAR(1)=NCHAR(252);

-- Helper to materialize placeholders to real letters
DECLARE @p_s NVARCHAR(20)='_SCHWA_',      @p_S NVARCHAR(20)='_CAP_SCHWA_';
DECLARE @p_i NVARCHAR(20)='_DOTLESSI_',   @p_I NVARCHAR(20)='_CAP_I_DOT_';
DECLARE @p_sh NVARCHAR(20)='_SCEDILLA_',  @p_ch NVARCHAR(20)='_CCEDILLA_';
DECLARE @p_ouml NVARCHAR(20)='_OUML_',    @p_uuml NVARCHAR(20)='_UUML_';

-- Function pattern as inline replacement: REPLACE(REPLACE(...))

/* Product 1 */
DECLARE @b1_d NVARCHAR(MAX) =
'Market Modulunuz Mallar_DOTLESSI_n_DOTLESSI_z Anbar_DOTLESSI_n_DOTLESSI_za Daxil Oldu_UUML_ Andan Etibar_SCHWA_n Sat_DOTLESSI_lana Q_CAP_SCHWA_d_CAP_SCHWA_r B_UUML_t_UUML_n H_CAP_SCHWA_r_CAP_SCHWA_k_CAP_SCHWA_tl_CAP_SCHWA_rini T_CAP_SCHWA_qib Ed_CAP_SCHWA, Mal _CAP_SCHWA_sas_CAP_SCHWA_nda Qazanc V_CAP_SCHWA_ Ya Z_CAP_SCHWA_r_CAP_SCHWA_rinizin Hesabat_DOTLESSI_n_DOTLESSI_ Haz_DOTLESSI_rlaya Bil_CAP_SCHWA_r. Bu Proqram Vasit_CAP_SCHWA_sil_CAP_SCHWA_ Siz Barkodlu Mal S_CAP_SCHWA_rgil_CAP_SCHWA_y_CAP_SCHWA_n V_CAP_SCHWA_ T_CAP_SCHWA_tbiqini H_CAP_SCHWA_yata Ke_CCEDILLA_ir_CAP_SCHWA_r_CAP_SCHWA_k M_UUML_st_CAP_I_DOT_ri T_CAP_SCHWA_l_CAP_SCHWA_bl_CAP_SCHWA_rin_CAP_SCHWA_ Daha S_UUML_r_CAP_I_DOT_tli Cavab Ver_CAP_SCHWA_c_CAP_SCHWA_k V_CAP_SCHWA_ Anbar_DOTLESSI_n_DOTLESSI_ N_CAP_SCHWA_zar_CAP_SCHWA_td_CAP_SCHWA_ Saxlaya Bil_CAP_SCHWA_c_CAP_SCHWA_ksiniz.';
DECLARE @b1_s1 NVARCHAR(MAX) =
'Sat_SCEDILLA_ n_OUML_qt_CAP_SCHWA_sinin idar_CAP_SCHWA_ olunmas_CAP_SCHWA_, sat_SCEDILLA_ tempin_CAP_SCHWA_ n_CAP_SCHWA_zar_CAP_SCHWA_t v_CAP_SCHWA_ m_UUML_xtl_CAP_SCHWA_f mal qruplar_CAP_SCHWA_na g_OUML_r_CAP_SCHWA_ _CCEDILLA_e_SCEDILLA__DOTLESSI_dl_CAP_SCHWA_m_CAP_SCHWA_ imkan_CAP_SCHWA_ m_OUML_vcuddur. Endiriml_CAP_SCHWA_r mal, _SCEDILLA__OUML_b_CAP_SCHWA_, tarix v_CAP_SCHWA_ saata _CAP_SCHWA_sas_CAP_SCHWA_n t_CAP_SCHWA_yin edil_CAP_SCHWA_ bil_CAP_SCHWA_r. Barkodlu sat_SCEDILLA_, _CCEDILLA_eki v_CAP_SCHWA_ _CCEDILLA_d_CAP_SCHWA_g_OUML_r_CAP_SCHWA_ _CCEDILLA__DOTLESSI_mliyyatlar_CAP_SCHWA_, barkodlu t_CAP_SCHWA_r_CAP_SCHWA_i il_CAP_SCHWA_ inteqrasiya m_OUML_mk_UUML_nd_UUML_r. Sat_SCEDILLA_ faiz_DOTLESSI_ il_CAP_SCHWA_ avtomatik qiym_CAP_SCHWA_t h_CAP_SCHWA_sablan_CAP_SCHWA_ bil_CAP_SCHWA_r. Al_DOTLESSI_v_CCedilla_ri_CCedilla_ statistik as_DOTLESSI_zl_CCedilla_r, sensorlu ekran d_CAP_SCHWA_st_CCedilla_yi v_CAP_SCHWA_ m_UUML__SCEDILLA_t_CCedilla_riyy_CCedilla_ d_CCedilla_hal faktura verilm_CCedilla_si t_CCedilla_min olunur.';
DECLARE @b1_s2 NVARCHAR(MAX) =
'M_UUML__SCEDILLA_t_CCedilla_ri m_CCedilla_lumatlar_DOTLESSI_ (t_CCedilla_hsil, pe_SCEDILLA__CAP_SCHWA_ v_CAP_SCHWA_ s.) sistem_CAP_SCHWA_ daxil edil_CAP_SCHWA_ bil_CAP_SCHWA_r. Al_DOTLESSI_v_CCedilla_ri_CCedilla_ tarix_CCedilla_sin_CAP_SCHWA_ _CAP_SCHWA_sas_CAP_SCHWA_n m_UUML_ _SCEDILLA_t_CCedilla_ril_CAP_SCHWA_ri qrupla_SCEDILLA_d_CAP_SCHWA_rmaq v_CAP_SCHWA_ analiz etm_CAP_SCHWA_k m_UUML_mk_UUML_nd_UUML_r. _SCEDILLA__DOTLESSI_k_CAP_SCHWA_y_CAP_SCHWA_t v_CAP_SCHWA_ t_CAP_SCHWA_klifl_CAP_SCHWA_r toplan_CAP_SCHWA_r, f_CAP_SCHWA_rdi qiym_CAP_SCHWA_t v_CAP_SCHWA_ endirim kartlar_DOTLESSI_ t_CCedilla_yin olunur.';
DECLARE @b1_s3 NVARCHAR(MAX) =
'Anbarlarda mal qruplar_CAP_SCHWA_ _UUML_zr_CCedilla_ statistika, giri_SCEDILLA_-_CCEDILLA__CCEDILLA__DOTLESSI_ sən_CAP_SCHWA_dl_CAP_SCHWA_ri v_CAP_SCHWA_ transferl_CAP_SCHWA_r idar_CAP_SCHWA_ olunur. Ma_CAP_SCHWA_za v_CAP_SCHWA_ anbarlara g_CAP_SCHWA_r_CCedilla_ qal_CAP_SCHWA_qlar izlənir, avtomatik sənədlə_CCedilla_mə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür. Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.';

-- Common replace chain function inline
DECLARE @d1 NVARCHAR(MAX) = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@b1_d,
    @p_s, @SCHWA), @p_S, @CAP_SCHWA), @p_i, @DOTLESSI), @p_I, @CAP_I_DOT), @p_sh, @SCEDILLA), @p_ch, @CCEDILLA), @p_ouml, @OUML);
SET @d1 = REPLACE(@d1, @p_uuml, @UUML);

DECLARE @s1 NVARCHAR(MAX) = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@b1_s1,
    @p_s, @SCHWA), @p_S, @CAP_SCHWA), @p_i, @DOTLESSI), @p_I, @CAP_I_DOT), @p_sh, @SCEDILLA), @p_ch, @CCEDILLA), @p_ouml, @OUML);
SET @s1 = REPLACE(@s1, @p_uuml, @UUML);

DECLARE @s2 NVARCHAR(MAX) = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@b1_s2,
    @p_s, @SCHWA), @p_S, @CAP_SCHWA), @p_i, @DOTLESSI), @p_I, @CAP_I_DOT), @p_sh, @SCEDILLA), @p_ch, @CCEDILLA), @p_ouml, @OUML);
SET @s2 = REPLACE(@s2, @p_uuml, @UUML);

DECLARE @s3 NVARCHAR(MAX) = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@b1_s3,
    @p_s, @SCHWA), @p_S, @CAP_SCHWA), @p_i, @DOTLESSI), @p_I, @CAP_I_DOT), @p_sh, @SCEDILLA), @p_ch, @CCEDILLA), @p_ouml, @OUML);
SET @s3 = REPLACE(@s3, @p_uuml, @UUML);

UPDATE Products SET DetailDescription=@d1, Section1Description=@s1, Section2Description=@s2, Section3Description=@s3 WHERE Id=1;

COMMIT;



