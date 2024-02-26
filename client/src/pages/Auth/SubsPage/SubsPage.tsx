import { FC } from 'react'
import Sidebar from '@/components/Subs/Sidebar/Sidebar'
import styles from './SubsPage.module.scss'
import { useTheme } from '@hooks/useTheme'
import BgCircles from '@/components/Subs/BgCircles/BgCircles'
import Search from '@/components/Subs/Search/Search'
import SubsContainer from '@/components/Subs/SubsContainer/SubsContainer'
import SubCard from '@/components/Subs/SubCard/SubCard'
import BaseButton from '@ui/Buttons/BaseButton'
import useAuthStore from '@hooks/useAuthStore'
import CircleLoader from '@ui/CircleLoader/CircleLoader'

const SubsPage: FC = () => {
    const { theme } = useTheme()

    const user = useAuthStore(store => store.user)

    if (!user) return <CircleLoader />

    const THEME_CLASSES = styles[`wrapper_${theme}`]

    return (
        <div className={`${styles.wrapper} ${THEME_CLASSES}`}>
            <Sidebar />

            <BgCircles>
                <Search
                    searchLabelText="Мои подписки"
                    className={styles.search}
                />
                <SubsContainer className={styles.subs_container}>
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                    <SubCard />
                </SubsContainer>

                <BaseButton className={styles.button}>Добавить</BaseButton>
            </BgCircles>
        </div>
    )
}

export default SubsPage
