package com.swimpay.merchant

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.swimpay.merchant.ui.screens.*
import com.swimpay.merchant.ui.theme.SwimPayMerchantTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SwimPayMerchantTheme {
                MainNavigation()
            }
        }
    }
}

@Composable
fun MainNavigation() {
    val navController = rememberNavController()
    var selectedItem by remember { mutableStateOf(0) }
    val items = listOf("Dashboard", "Revue", "Ventes", "Plus")
    val icons = listOf(Icons.Default.Dashboard, Icons.Default.History, Icons.Default.ShoppingCart, Icons.Default.MoreHoriz)

    Scaffold(
        bottomBar = {
            NavigationBar {
                items.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { Icon(icons[index], contentDescription = item) },
                        label = { Text(item) },
                        selected = selectedItem == index,
                        onClick = {
                            selectedItem = index
                            when(index) {
                                0 -> navController.navigate("dashboard")
                                1 -> navController.navigate("review")
                                2 -> navController.navigate("orders")
                                3 -> navController.navigate("settings")
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController, 
            startDestination = "dashboard",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("dashboard") { DashboardScreen() }
            composable("review") { ReviewScreen() }
            composable("orders") { OrdersScreen() }
            composable("settings") { SettingsScreen() }
            
            // Sous-écrans (Accessibles via paramètres)
            composable("onboarding") { OnboardingScreen() }
            composable("sync_engine") { SyncEngineScreen() }
            composable("bank_channels") { BankChannelsScreen() }
            composable("phone_settings") { PhoneSettingsScreen() }
            composable("security") { SecurityCenterScreen() }
            composable("support") { SupportScreen() }
            composable("conditions") { ConditionsScreen() }
        }
    }
}
