import Navbar from "../sections/Navbar";

const meta = [
  ["Sector", "Pan-African payments"],
  ["Engagement", "Crowdsourced burst, 9 days"],
  ["Team", "6 testers, 1 lead, 1 automation engineer"],
];

const stats = [
  ["2,148", "Cases executed", false],
  ["41", "Defects filed", false],
  ["6", "Release blockers", true],
  ["0", "Rollbacks after launch", true],
];

const sections = [
  ["The situation", "situation"],
  ["What we did", "what-we-did"],
  ["What broke", "what-broke"],
  ["Outcome", "outcome"],
];

const ticketRows = [
  ["Steps", "Start card payment \u00b7 force 3DS timeout at 30s \u00b7 tap Retry once."],
  ["Expected", "Single authorisation, retry reuses the original intent."],
  ["Actual", "Two authorisations, second captured. Reproduced 5/5 on two schemes."],
  ["Environment", "Staging 4.2.0-rc3 \u00b7 Android 14 \u00b7 NG locale"],
];

const situationBody =
  "A new checkout was due in nine days across four locales and three card schemes. The in-house team had unit coverage but no end-to-end suite, and no one had tested the failure paths - timeouts, retries, partial captures.";

const didBody =
  "We wrote a risk map in a day, agreed exit criteria with the release manager, and split the work: six testers on manual exploratory and locale passes, one engineer building an automated regression suite the client kept afterwards.";

const brokeBody =
  "Six blockers, all on failure paths: a double-charge on 3DS retry, two locale-specific address validations rejecting valid input, a partial-capture reconciliation gap, and two performance cliffs above 4,000 concurrent sessions.";

const outcomeBody =
  "All six were fixed and re-tested before the date. The launch held without a rollback, and the automated suite has run nightly since - now maintained by the client's own team.";

const Nuts = () => (
  <svg
    aria-hidden="true"
    viewBox="1000 -181 650 650"
    className="pointer-events-none absolute right-[-208px] top-[-267px] hidden h-[650px] w-[650px] opacity-25 lg:block"
  >
    <path
      fill="none"
      stroke="#964A21"
      strokeWidth="26.48"
      d="M1345.52 -181C1352.65 -181 1356.22 -181 1359.27 -180.533C1375.42 -178.067 1388.53 -166.199 1392.59 -150.379C1393.36 -147.382 1393.72 -143.834 1394.43 -136.737C1395.76 -123.348 1396.43 -116.654 1397.87 -112.347C1405.71 -88.8129 1432.58 -77.6829 1454.76 -88.7803C1458.82 -90.8112 1464.03 -95.0686 1474.43 -103.583C1479.94 -108.09 1482.7 -110.344 1485.35 -111.917C1499.42 -120.239 1517.09 -119.357 1530.25 -109.678C1532.74 -107.848 1535.26 -105.331 1540.29 -100.298L1569.34 -71.249C1574.36 -66.225 1576.87 -63.7125 1578.7 -61.2285C1588.39 -48.0616 1589.27 -30.3799 1580.94 -16.3145C1579.37 -13.6609 1577.12 -10.9112 1572.62 -5.41211C1564.12 4.9761 1559.87 10.1708 1557.84 14.2227C1546.73 36.4138 1557.87 63.3003 1581.42 71.1348C1585.72 72.5652 1592.4 73.2332 1605.76 74.5693C1612.84 75.2772 1616.37 75.6314 1619.36 76.3975C1635.2 80.4545 1647.07 93.5784 1649.53 109.735C1650 112.786 1650 116.342 1650 123.452V164.521C1650 171.645 1650 175.208 1649.53 178.265C1647.07 194.413 1635.2 207.529 1619.38 211.588C1616.38 212.356 1612.83 212.71 1605.75 213.419C1592.36 214.758 1585.66 215.427 1581.35 216.864C1557.82 224.706 1546.7 251.567 1557.79 273.748C1559.82 277.812 1564.08 283.022 1572.61 293.44C1577.12 298.958 1579.38 301.717 1580.95 304.38C1589.27 318.437 1588.39 336.102 1578.71 349.262C1576.88 351.755 1574.36 354.275 1569.32 359.315L1540.29 388.346C1535.26 393.38 1532.74 395.897 1530.25 397.728C1517.09 407.406 1499.42 408.287 1485.36 399.967C1482.7 398.393 1479.94 396.138 1474.43 391.628C1464.02 383.115 1458.82 378.858 1454.76 376.827C1432.58 365.725 1405.7 376.857 1397.86 400.396C1396.43 404.7 1395.76 411.387 1394.42 424.759C1393.72 431.837 1393.36 435.377 1392.6 438.368C1388.54 454.198 1375.42 466.073 1359.26 468.535C1356.21 469 1352.65 469 1345.54 469H1304.46C1297.35 469 1293.79 469 1290.74 468.535C1274.58 466.074 1261.46 454.197 1257.4 438.365C1256.64 435.376 1256.28 431.838 1255.58 424.763C1254.24 411.397 1253.57 404.714 1252.14 400.411C1244.3 376.869 1217.42 365.735 1195.23 376.841C1191.18 378.871 1185.98 383.127 1175.57 391.639C1170.06 396.15 1167.3 398.407 1164.64 399.98C1150.58 408.301 1132.91 407.419 1119.75 397.741C1117.26 395.91 1114.74 393.393 1109.71 388.358L1080.68 359.332C1075.64 354.288 1073.12 351.766 1071.28 349.271C1061.61 336.113 1060.73 318.453 1069.04 304.397C1070.62 301.733 1072.88 298.971 1077.4 293.448C1085.93 283.023 1090.19 277.811 1092.22 273.745C1103.31 251.566 1092.19 224.71 1068.66 216.867C1064.35 215.429 1057.65 214.76 1044.26 213.42C1037.16 212.711 1033.62 212.356 1030.62 211.587C1014.8 207.527 1002.93 194.413 1000.47 178.268C1000 175.209 1000 171.645 1000 164.518V123.456C1000 116.342 1000 112.785 1000.46 109.732C1002.93 93.5776 1014.8 80.4561 1030.63 76.3984C1033.62 75.6318 1037.16 75.2774 1044.24 74.5693C1057.61 73.2324 1064.3 72.5639 1068.6 71.1318C1092.14 63.2954 1103.28 36.4159 1092.17 14.2275C1090.14 10.1725 1085.89 4.97471 1077.38 -5.4209C1072.88 -10.9242 1070.63 -13.6763 1069.05 -16.332C1060.73 -30.3957 1061.61 -48.0739 1071.29 -61.2393C1073.12 -63.7252 1075.64 -66.2391 1080.67 -71.2666L1109.71 -100.312C1114.74 -105.345 1117.26 -107.862 1119.75 -109.692C1132.91 -119.371 1150.58 -120.252 1164.64 -111.931C1167.3 -110.357 1170.06 -108.103 1175.57 -103.596C1185.97 -95.0805 1191.18 -90.823 1195.24 -88.792C1217.42 -77.6951 1244.29 -88.8244 1252.13 -112.357C1253.57 -116.665 1254.24 -123.358 1255.57 -136.744C1256.28 -143.836 1256.64 -147.382 1257.41 -150.377C1261.47 -166.199 1274.58 -178.068 1290.73 -180.533C1293.79 -181 1297.35 -181 1304.47 -181H1345.52Z"
    />
    <path
      fill="none"
      stroke="#964A21"
      strokeWidth="26.12"
      d="M1335.91 -13.9688C1339.71 -13.9687 1341.6 -13.9692 1343.23 -13.7207C1351.82 -12.4087 1358.8 -6.09384 1360.96 2.32422C1361.37 3.91854 1361.56 5.80703 1361.93 9.58301C1362.65 16.7058 1363 20.2672 1363.77 22.5586C1367.94 35.0813 1382.23 41.004 1394.04 35.0986C1396.2 34.0181 1398.97 31.7534 1404.5 27.2236C1407.43 24.8256 1408.9 23.6262 1410.31 22.7891C1417.8 18.3613 1427.2 18.8302 1434.2 23.9805C1435.53 24.9542 1436.87 26.2939 1439.54 28.9717L1455 44.4297C1457.67 47.1023 1459.01 48.4385 1459.98 49.7598C1465.14 56.7662 1465.61 66.1756 1461.17 73.6602C1460.34 75.0715 1459.14 76.5341 1456.75 79.459C1452.23 84.9847 1449.97 87.7481 1448.89 89.9033C1442.97 101.712 1448.9 116.019 1461.43 120.188C1463.72 120.948 1467.27 121.304 1474.38 122.015C1478.15 122.391 1480.03 122.58 1481.62 122.987C1490.04 125.146 1496.36 132.128 1497.67 140.726C1497.92 142.349 1497.92 144.241 1497.92 148.023V169.876C1497.92 173.667 1497.92 175.562 1497.67 177.188C1496.36 185.78 1490.04 192.759 1481.63 194.919C1480.03 195.328 1478.15 195.516 1474.37 195.894C1467.25 196.606 1463.69 196.963 1461.39 197.728C1448.87 201.9 1442.95 216.192 1448.85 227.994C1449.94 230.157 1452.2 232.929 1456.74 238.474C1459.14 241.41 1460.34 242.879 1461.18 244.296C1465.61 251.775 1465.14 261.174 1459.99 268.176C1459.02 269.503 1457.68 270.844 1454.99 273.526L1439.55 288.973C1436.87 291.651 1435.53 292.991 1434.2 293.965C1427.2 299.115 1417.8 299.583 1410.32 295.156C1408.9 294.319 1407.44 293.119 1404.5 290.719C1398.97 286.189 1396.2 283.924 1394.04 282.844C1382.23 276.936 1367.93 282.86 1363.76 295.385C1363 297.675 1362.64 301.232 1361.93 308.347C1361.56 312.113 1361.37 313.997 1360.96 315.588C1358.8 324.011 1351.82 330.329 1343.22 331.64C1341.6 331.887 1339.71 331.888 1335.92 331.888H1314.06C1310.28 331.888 1308.39 331.887 1306.77 331.64C1298.17 330.33 1291.19 324.011 1289.03 315.587C1288.62 313.996 1288.43 312.113 1288.05 308.349C1287.34 301.237 1286.99 297.681 1286.23 295.392C1282.06 282.865 1267.75 276.941 1255.95 282.851C1253.79 283.931 1251.02 286.195 1245.49 290.725C1242.55 293.126 1241.08 294.327 1239.67 295.164C1232.19 299.591 1222.78 299.123 1215.78 293.974C1214.46 292.999 1213.12 291.659 1210.44 288.979L1194.99 273.536C1192.31 270.852 1190.97 269.509 1189.99 268.182C1184.85 261.18 1184.38 251.784 1188.8 244.306C1189.64 242.887 1190.84 241.418 1193.25 238.479C1197.79 232.93 1200.06 230.156 1201.14 227.992C1207.04 216.192 1201.12 201.903 1188.6 197.729C1186.31 196.964 1182.74 196.607 1175.61 195.895C1171.84 195.517 1169.95 195.328 1168.36 194.919C1159.94 192.759 1153.62 185.781 1152.31 177.19C1152.06 175.563 1152.06 173.666 1152.06 169.873V148.026C1152.06 144.241 1152.06 142.349 1152.31 140.725C1153.62 132.129 1159.94 125.146 1168.36 122.987C1169.95 122.579 1171.84 122.391 1175.6 122.015C1182.72 121.303 1186.27 120.947 1188.56 120.186C1201.09 116.016 1207.01 101.713 1201.1 89.9062C1200.02 87.7492 1197.76 84.9839 1193.24 79.4541C1190.84 76.5265 1189.65 75.0621 1188.81 73.6494C1184.38 66.1661 1184.85 56.7593 1190 49.7539C1190.97 48.4315 1192.31 47.0946 1194.99 44.4199L1210.44 28.9648C1213.12 26.2863 1214.46 24.9466 1215.78 23.9727C1222.79 18.8229 1232.19 18.3538 1239.67 22.7812C1241.08 23.6186 1242.55 24.8181 1245.48 27.2168C1251.02 31.7479 1253.79 34.014 1255.95 35.0947C1267.75 40.9988 1282.05 35.077 1286.22 22.5557C1286.99 20.2637 1287.34 16.702 1288.05 9.5791C1288.43 5.80575 1288.62 3.91892 1289.03 2.3252C1291.19 -6.09358 1298.17 -12.4091 1306.76 -13.7207C1308.39 -13.969 1310.28 -13.9688 1314.07 -13.9688H1335.91Z"
    />
  </svg>
);

const Tag = ({ children, filled = false }) => (
  <span
    className={`inline-flex h-[26px] items-center px-[12px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] ${
      filled
        ? "bg-dark-brown text-light-brown"
        : "border border-dark-brown/30 text-dark-brown"
    }`}
  >
    <span className="font-['DM_Sans'] font-semibold">{children}</span>
  </span>
);

const SectionHeading = ({ id, children }) => (
  <h2 id={id} className="text-[36px] leading-none text-dark-brown">
    <span className="font-['Barlow_Condensed'] font-bold uppercase">{children}</span>
  </h2>
);

const Body = ({ children }) => (
  <p className="mt-[11px] max-w-[740px] text-[15px] leading-[27px] text-dark-brown/80">
    <span className="font-['DM_Sans']">{children}</span>
  </p>
);

const DefectTicket = () => (
  <div className="mt-[1px] max-w-[744px] bg-medium-brown px-[24px] pb-[22px] pt-[26px]">
    <p className="text-[8px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown/60">
      <span className="font-['DM_Sans'] font-semibold">Defect ticket as filed</span>
    </p>
    <div className="mt-[11px] bg-white px-[18px] pb-[17px] pt-[13px]">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <p className="text-[15px] font-medium leading-[20px] text-dark-brown">
          <span className="font-['DM_Sans'] font-medium">
            TJ-0918 &middot; Retry after 30s timeout &middot; double-charges
          </span>
        </p>
        <span className="inline-flex h-[20px] w-[69px] items-center justify-center bg-accent-brown text-[8px] font-semibold uppercase leading-none tracking-[0.1em] text-white">
          <span className="font-['DM_Sans'] font-semibold">Blocker</span>
        </span>
      </div>
      <div className="mt-[12px] space-y-[1px]">
        {ticketRows.map(([label, value]) => (
          <p key={label} className="text-[13px] leading-[28px] text-dark-brown">
            <span className="font-['DM_Sans']">
              <span className="font-semibold">{label}</span>
              {" \u00b7 "}
              {value}
            </span>
          </p>
        ))}
      </div>
    </div>
  </div>
);

const CaseStudyPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="relative overflow-hidden px-5 pb-[44px] pt-12 md:px-[4vw] md:pb-[33px] md:pt-[58px]">
        <Nuts />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-[80px]">
          <div>
            <div className="flex flex-wrap items-center gap-[11px]">
              <Tag filled>Fintech</Tag>
              <Tag>Regression + performance</Tag>
            </div>
            <h1 className="mt-[22px] text-[48px] leading-[0.92] tracking-[0.005em] text-dark-brown sm:text-[62px] lg:text-[72px] lg:leading-[66px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                <span className="block">A payments checkout,</span>
                <span className="block">four days from launch</span>
              </span>
            </h1>
            <p className="mt-[26px] max-w-[500px] text-[15px] leading-[24px] text-dark-brown/75">
              <span className="font-['DM_Sans']">
                The client is anonymised at their request. Everything below is the work as it ran.
              </span>
            </p>
          </div>

          <dl className="lg:mt-[82px]">
            {meta.map(([label, value]) => (
              <div key={label} className="border-t border-dark-brown/20 py-[11px]">
                <dt className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown/60">
                  <span className="font-['DM_Sans'] font-semibold">{label}</span>
                </dt>
                <dd className="mt-[7px] text-[15px] leading-[20px] text-dark-brown">
                  <span className="font-['DM_Sans']">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-dark-brown px-5 py-[37px] md:px-[4vw]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-4">
          {stats.map(([value, label, muted]) => (
            <div key={label}>
              <p className={`text-[52px] leading-none sm:text-[62px] lg:text-[66px] ${muted ? "text-medium-brown" : "text-light-brown"}`}>
                <span className="font-['Barlow_Condensed'] font-bold uppercase">{value}</span>
              </p>
              <p className="mt-[12px] text-[8px] font-semibold uppercase leading-none tracking-[0.14em] text-light-brown/60">
                <span className="font-['DM_Sans'] font-semibold">{label}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-[66px] pt-[62px] md:px-[4vw]">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-[56px]">
          <nav aria-label="Case study sections" className="lg:-mt-[3px] lg:pl-[14px]">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-[22px]">
              {sections.map(([label, id], index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`text-[12px] font-semibold uppercase leading-none tracking-[0.14em] ${
                      index === 0 ? "text-accent-brown" : "text-dark-brown/55"
                    }`}
                  >
                    <span className="font-['DM_Sans'] font-semibold">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <SectionHeading id="situation">The situation</SectionHeading>
            <Body>{situationBody}</Body>

            <div id="what-we-did" className="mt-[26px] scroll-mt-28">
              <SectionHeading>What we did</SectionHeading>
              <Body>{didBody}</Body>
            </div>

            <DefectTicket />

            <div id="what-broke" className="mt-[38px] scroll-mt-28">
              <SectionHeading>What broke</SectionHeading>
              <Body>{brokeBody}</Body>
            </div>

            <div id="outcome" className="mt-[25px] scroll-mt-28">
              <SectionHeading>Outcome</SectionHeading>
              <Body>{outcomeBody}</Body>
            </div>

            <figure className="mt-[26px] max-w-[640px]">
              <blockquote className="text-[20px] leading-[30px] text-dark-brown">
                <span className="font-['DM_Sans']">
                  &ldquo;They found the failure paths we hadn&rsquo;t thought to write down.&rdquo;
                </span>
              </blockquote>
              <figcaption className="mt-[6px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown/60">
                <span className="font-['DM_Sans'] font-semibold">
                  Release manager &middot; Payments platform
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default CaseStudyPage;
