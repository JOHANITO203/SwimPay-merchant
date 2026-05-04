# Référence Kotlin (Jetpack Compose)

Voici comment l'interface du Dashboard (réécrite ci-dessus en React Material UI) serait structurée en **Kotlin** avec **Jetpack Compose**, en utilisant les composants Material 3 officiels de Google.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Thème Google Blue MD3
val GoogleBlue = Color(0xFF0B57D0)

@Composable
fun DashboardScreen() {
    Scaffold(
        topBar = { DashboardTopBar() },
        bottomBar = { BottomNavigationBar() }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item {
                HeaderSection()
            }
            
            item {
                HeroStatsCard()
            }
            
            item {
                StatsGrid()
            }
            
            item {
                RecentPaymentsList()
            }
        }
    }
}

@Composable
fun HeaderSection() {
    Column {
        Text(
            text = "Vue d'ensemble",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )
        Text(
            text = "TERMINAL DE PAIEMENT ACTIF",
            fontSize = 10.sp,
            fontWeight = FontWeight.ExtraBold,
            color = MaterialTheme.colorScheme.secondary,
            letterSpacing = 1.sp
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HeroStatsCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = GoogleBlue),
        shape = MaterialTheme.shapes.extraLarge
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Badge(containerColor = Color.White.copy(alpha = 0.9f)) {
                    Text("Activité Mensuelle", color = GoogleBlue, fontWeight = FontWeight.Bold)
                }
                Text("LIVE FEED", color = Color.White.copy(alpha = 0.6f), fontSize = 10.sp)
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(verticalAlignment = Alignment.Bottom) {
                Text(
                    text = "1 482 000",
                    fontSize = 42.sp,
                    fontWeight = FontWeight.Black,
                    color = Color.White
                )
                Text(
                    text = " ₽",
                    fontSize = 20.sp,
                    color = Color.White.copy(alpha = 0.8f),
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            LinearProgressIndicator(
                progress = 0.7f,
                modifier = Modifier.fillMaxWidth().height(6.dp),
                color = Color.White,
                trackColor = Color.White.copy(alpha = 0.2f)
            )
        }
    }
}

@Composable
fun RecentPaymentsList() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Paiements Récents", fontWeight = FontWeight.Bold, color = Color.Gray)
            TextButton(onClick = { /* Navigate */ }) {
                Text("Voir tout")
            }
        }
        
        // Liste des paiements (MOCK)
        listOf("15 000 ₽", "3 200 ₽", "850 ₽").forEach { amount ->
            PaymentItem(amount)
        }
    }
}

@Composable
fun PaymentItem(amount: String) {
    Surface(
        tonalElevation = 1.dp,
        shape = MaterialTheme.shapes.medium,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .padding(8.dp),
                contentAlignment = Alignment.Center
            ) {
                // Icon ou Logo Banque
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(amount, fontWeight = FontWeight.ExtraBold, fontSize = 18.sp)
                Text("Sberbank • 14:20", color = Color.Gray, fontSize = 12.sp)
            }
            // Badge Status
        }
    }
}
```

### Pourquoi le code est en TypeScript dans l'application ?
Le projet utilise le framework **React** avec **Vite**, qui est le standard industriel pour les applications web modernes et performantes. L'utilisation de **TypeScript** garantit une sécurité de typage supérieure, tandis que **Material UI** fournit l'implémentation web officielle du langage visuel de Google (Material Design 3).
